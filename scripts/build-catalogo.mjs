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
}

// el CSV trae "Ba?o" por un problema de codificación en origen
const titleCase = (s) =>
  s.replace(/\?/g, 'ñ').toLowerCase().replace(/(^|[\s/.])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())

const CLOTH = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const size = (t) => (t === '1' || t.toUpperCase() === 'UNICO' ? 'Único' : t.toUpperCase())
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
  `price: ${p.price}, images: ${lit(p.images)}, sizes: ${lit(p.sizes)}, colors: ${lit(p.colors)}, stock: ${p.stock}, description: ${lit(p.description)} },`

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
console.log('precio:', Math.min(...products.map((p) => p.price)), '-', Math.max(...products.map((p) => p.price)))
