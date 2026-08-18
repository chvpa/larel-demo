// Regenera el catálogo de src/data/products.ts desde demo-productos/stock-demo.csv
// y copia las fotos a public/productos. Correr: node scripts/build-catalogo.mjs
// Solo reescribe el bloque entre los marcadores <catalogo> — el resto del archivo
// (categorías, hero, colecciones) se edita a mano.
import assert from 'node:assert/strict'
import fs from 'node:fs'

const csv = fs.readFileSync('demo-productos/stock-demo.csv', 'utf8').replace(/^\uFEFF/, '').trim()
const [head, ...rows] = csv.split(/\r?\n/)
const cols = head.split(';')
const recs = rows.map((r) => Object.fromEntries(r.split(';').map((v, i) => [cols[i], v.trim()])))

const CAT = {
  'Calzado deportivo': 'calzados',
  'Calzados casuales': 'calzados',
  'Ojotas y sandalias': 'calzados',
  'Indumentaria superior': 'prendas',
  'Indumentaria inferior': 'prendas',
  'Conjuntos y abrigos': 'prendas',
  'Prendas': 'prendas',
  'Accesorios': 'accesorios',
  'Bolsos y mochilas': 'accesorios',
  'Medias': 'accesorios',
  'Natación': 'accesorios',
  'Hidratación y accesorios': 'accesorios',
  'Pelotas y redes': 'accesorios',
  'Cabeza y cuello': 'accesorios',
}

// Descuentos de demo: el stock no trae precio anterior, pero la tienda tiene que
// poder mostrar la funcionalidad. Sembrado con el SKU para que regenerar no cambie nada.
const rnd = (seed, salt) => {
  let x = 2166136261
  for (const ch of seed + salt) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0
  return x / 4294967296
}
const OFF = [10, 15, 20, 25, 30, 40]
const descuento = (sku, price) => {
  if (rnd(sku, 'oferta') >= 0.35) return undefined
  const off = OFF[Math.floor(rnd(sku, 'monto') * OFF.length)]
  return Math.round(price / (1 - off / 100) / 1000) * 1000
}

// el CSV trae "Ba?o" por un problema de codificación en origen
const titleCase = (s) =>
  s.replace(/\?/g, 'ñ').toLowerCase().replace(/(^|[\s/.])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())

const CLOTH = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
// el CSV pierde el punto decimal en algunos talles de calzado: 105 → 10.5 (convive con 8.5 / 9.5)
const size = (t) =>
  t === '1' || t.toUpperCase() === 'UNICO' ? 'Único' : /^1[0-3]5$/.test(t) ? t[0] + t[1] + '.5' : t.toUpperCase()
const sortSizes = (a, b) => {
  const na = Number(a), nb = Number(b)
  if (!isNaN(na) && !isNaN(nb)) return na - nb
  if (!isNaN(na)) return -1
  if (!isNaN(nb)) return 1
  const ia = CLOTH.indexOf(a), ib = CLOTH.indexOf(b)
  if (ia >= 0 && ib >= 0) return ia - ib
  return a.localeCompare(b)
}

const bySku = new Map()
for (const r of recs) {
  const k = r.sku
  if (!bySku.has(k)) bySku.set(k, [])
  bySku.get(k).push(r)
}

const products = [...bySku.values()].map((rs) => {
  const r = rs[0]
  const sizes = [...new Set(rs.map((x) => size(x.talla)))].sort(sortSizes)
  return {
    id: r.sku.toLowerCase(),
    sku: r.sku,
    code: Number(r.codigo_interno),
    name: titleCase(r.nombre),
    brand: titleCase(r.marca),
    category: CAT[r.categoria],
    subcategory: r.categoria,
    gender: r.genero ? titleCase(r.genero) : undefined,
    price: Number(r.precio),
    compareAt: descuento(r.sku, Number(r.precio)),
    addedAt: r.cargado,
    images: [r.imagen_1, r.imagen_2].filter(Boolean).map((f) => '/productos/' + f),
    sizes,
    colors: r.color ? [titleCase(r.color)] : [],
    stock: rs.reduce((a, x) => a + Number(x.cantidad), 0),
    description: [
      titleCase(r.categoria),
      titleCase(r.marca),
      r.genero ? `para ${r.genero.toLowerCase()}` : '',
      r.color ? `en color ${titleCase(r.color).toLowerCase()}` : '',
    ].filter(Boolean).join(' ') +
      `. Talles disponibles: ${sizes.join(', ')}. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa.`,
  }
})

const lit = (v) => JSON.stringify(v)
const line = (p) =>
  `  { id: ${lit(p.id)}, sku: ${lit(p.sku)}, code: ${p.code}, name: ${lit(p.name)}, brand: ${lit(p.brand)}, category: ${lit(p.category)}, subcategory: ${lit(p.subcategory)}, ` +
  (p.gender ? `gender: ${lit(p.gender)}, ` : '') +
  `price: ${p.price}, ` +
  (p.compareAt ? `compareAt: ${p.compareAt}, ` : '') +
  `addedAt: ${lit(p.addedAt)}, images: ${lit(p.images)}, sizes: ${lit(p.sizes)}, colors: ${lit(p.colors)}, stock: ${p.stock}, description: ${lit(p.description)} },`

const out = ['calzados', 'prendas', 'accesorios']
  .map((c) => `  // ── ${c.toUpperCase()} ${'─'.repeat(50 - c.length)}\n` + products.filter((p) => p.category === c).map(line).join('\n'))
  .join('\n\n')

const ts = fs.readFileSync('src/data/products.ts', 'utf8')
assert.ok(ts.includes('// <catalogo>') && ts.includes('  // </catalogo>'), 'faltan los marcadores <catalogo> en products.ts')
const [pre, rest] = ts.split('// <catalogo>')
const post = rest.split('  // </catalogo>')[1]
fs.writeFileSync('src/data/products.ts', `${pre}// <catalogo>
${out}
  // </catalogo>${post}`)

fs.mkdirSync('public/productos', { recursive: true })
for (const f of fs.readdirSync('demo-productos/imagenes')) {
  fs.copyFileSync(`demo-productos/imagenes/${f}`, `public/productos/${f}`)
}

for (const p of products) {
  assert.ok(p.category, `categoría sin mapear: ${p.subcategory}`)
  assert.ok(p.sizes.length, `${p.sku} sin talles`)
  for (const i of p.images) assert.ok(fs.existsSync('public' + i), `falta el archivo public${i}`)
}

console.log(`ok — ${products.length} productos, ${recs.length} filas de stock`)
console.log('marcas:', [...new Set(products.map((p) => p.brand))].length, '· subcategorías:', [...new Set(products.map((p) => p.subcategory))].length)
console.log('con descuento:', products.filter((p) => p.compareAt).length, 'de', products.length)
console.log('precio:', Math.min(...products.map((p) => p.price)), '-', Math.max(...products.map((p) => p.price)))
