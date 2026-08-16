export type Category = 'futbol' | 'running' | 'fitness' | 'lifestyle' | 'accesorios'

export type Product = {
  id: string
  name: string
  brand: string
  category: Category
  type: 'calzado' | 'prenda' | 'accesorio'
  price: number
  compareAt?: number
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  rating: number
  reviews: number
  tags: Array<'new' | 'oferta' | 'bestseller'>
  description: string
}

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

// image pool
const img = {
  shoeRed: u('photo-1542291026-7eec264c27ff'),
  shoeWhiteNike: u('photo-1595950653106-6c9ebd614d3a'),
  shoeJump: u('photo-1600185365483-26d7a4cc7519'),
  shoeVans: u('photo-1606107557195-0e29a4b5b4aa'),
  shoeAdidasWhite: u('photo-1605348532760-6753d2c43329'),
  shoeBlackNike: u('photo-1600269452121-4f2416e55c28'),
  shoeYellow: u('photo-1560769629-975ec94e6a86'),
  shoePairOrange: u('photo-1491553895911-0055eca6402d'),
  shoeBlackSole: u('photo-1512374382149-233c42b6a83b'),
  shoeWall: u('photo-1543508282-6319a3e2621f'),
  shoeTraining: u('photo-1539185441755-769473a23570'),
  shoeJordan: u('photo-1556906781-9a412961c28c'),
  shoeNmd: u('photo-1579338559194-a162d19bf842'),
  shoeWalk: u('photo-1552346154-21d32810aba3'),
  shoeTrail: u('photo-1465479423260-c4afc24172c6'),
  shoeBox: u('photo-1595341888016-a392ef81b7de'),
  teeWhite: u('photo-1521572163474-6864f9cf17ab'),
  hoodie: u('photo-1556821840-3a63f95609a7'),
  teeHanger: u('photo-1618354691373-d851c5c3a990'),
  leggings: u('photo-1571945153237-4929e783af4a'),
  yoga: u('photo-1506629082955-511b1aa562c8'),
  gymGirl: u('photo-1517836357463-d25dfeac3438'),
  gymMan: u('photo-1534438327276-14e5300c3a48'),
  training: u('photo-1571902943202-507ec2618e8f'),
  runSunset: u('photo-1552674605-db6ffd4facb5'),
  track: u('photo-1526232761682-d26e03ac148e'),
  trackStart: u('photo-1461896836934-ffe607ba8211'),
  bootsGrass: u('photo-1517466787929-bc90951d0974'),
  soccerPlay: u('photo-1551958219-acbc608c6377'),
  stadium: u('photo-1522778119026-d647f0596c20'),
  bootsClose: u('photo-1574629810360-7efbbe195018'),
  soccerSunset: u('photo-1551958219-acbc608c6377'),
  backpack: u('photo-1553062407-98eeb64c6a62'),
  backpackYellow: u('photo-1556306535-0f09a537f0a3'),
  cap: u('photo-1521369909029-2afed882baee'),
  bottle: u('photo-1575428652377-a2d80e2277fc'),
  bottleBlack: u('photo-1602143407151-7111542de6e8'),
  ball: u('photo-1622260614153-03223fb72052'),
  hoop: u('photo-1519861531473-9200262188bf'),
  gym: u('photo-1511886929837-354d827aae26'),
}

export const IMG = img

const SHOE_SIZES = ['37', '38', '39', '40', '41', '42', '43', '44']
const CLOTH_SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const ONE_SIZE = ['Único']

const D =
  'Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa.'

export const products: Product[] = [
  // ── FÚTBOL ──────────────────────────────────────────
  { id: 'bot-predator', name: 'Botín Predator League FG', brand: 'Adidas', category: 'futbol', type: 'calzado', price: 620000, compareAt: 780000, images: [img.bootsClose, img.bootsGrass], sizes: SHOE_SIZES, colors: ['Negro', 'Blanco'], stock: 24, rating: 4.8, reviews: 132, tags: ['bestseller', 'oferta'], description: `Botín de fútbol para césped natural, control total del balón. ${D}` },
  { id: 'bot-phantom', name: 'Botín Phantom GX Academy', brand: 'Nike', category: 'futbol', type: 'calzado', price: 690000, images: [img.bootsGrass, img.soccerPlay], sizes: SHOE_SIZES, colors: ['Verde', 'Negro'], stock: 18, rating: 4.7, reviews: 89, tags: ['new'], description: `Precisión en cada pase con la zona de golpeo texturizada. ${D}` },
  { id: 'bot-future', name: 'Botín Future Match TT', brand: 'Puma', category: 'futbol', type: 'calzado', price: 450000, compareAt: 560000, images: [img.soccerSunset, img.bootsClose], sizes: SHOE_SIZES, colors: ['Azul', 'Naranja'], stock: 31, rating: 4.5, reviews: 54, tags: ['oferta'], description: `Para canchas sintéticas, ajuste adaptativo FUZIONFIT. ${D}` },
  { id: 'cam-albirroja', name: 'Camiseta Albirroja 2026', brand: 'Puma', category: 'futbol', type: 'prenda', price: 520000, images: [img.teeHanger, img.soccerPlay], sizes: CLOTH_SIZES, colors: ['Blanco/Rojo'], stock: 60, rating: 4.9, reviews: 210, tags: ['new', 'bestseller'], description: `Camiseta oficial de la selección paraguaya, tecnología dryCELL. ${D}` },
  { id: 'short-futbol', name: 'Short de Fútbol Tiro 24', brand: 'Adidas', category: 'futbol', type: 'prenda', price: 180000, images: [img.soccerPlay, img.teeWhite], sizes: CLOTH_SIZES, colors: ['Negro', 'Azul'], stock: 45, rating: 4.4, reviews: 38, tags: [], description: `Short liviano AEROREADY para entrenamientos y partidos. ${D}` },
  { id: 'pelota-alrider', name: 'Pelota Al Rihla Pro', brand: 'Adidas', category: 'futbol', type: 'accesorio', price: 260000, compareAt: 320000, images: [img.ball, img.stadium], sizes: ONE_SIZE, colors: ['Blanco'], stock: 40, rating: 4.6, reviews: 67, tags: ['oferta'], description: `Pelota profesional N°5, costura termosellada. ${D}` },
  { id: 'canilleras', name: 'Canilleras Mercurial Lite', brand: 'Nike', category: 'futbol', type: 'accesorio', price: 95000, images: [img.bootsGrass, img.ball], sizes: ['S', 'M', 'L'], colors: ['Negro'], stock: 80, rating: 4.3, reviews: 25, tags: [], description: `Protección liviana con carcasa moldeada. ${D}` },
  { id: 'medias-futbol', name: 'Medias de Fútbol Team', brand: 'Umbro', category: 'futbol', type: 'accesorio', price: 55000, images: [img.soccerPlay, img.bootsClose], sizes: ['37-40', '41-44'], colors: ['Blanco', 'Negro', 'Rojo'], stock: 120, rating: 4.2, reviews: 19, tags: [], description: `Medias largas con soporte de arco y talón reforzado. ${D}` },

  // ── RUNNING ─────────────────────────────────────────
  { id: 'zap-pegasus', name: 'Zapatilla Pegasus 41', brand: 'Nike', category: 'running', type: 'calzado', price: 890000, images: [img.shoeWhiteNike, img.shoeJump], sizes: SHOE_SIZES, colors: ['Blanco', 'Negro'], stock: 22, rating: 4.9, reviews: 178, tags: ['new', 'bestseller'], description: `Amortiguación ReactX para tus kilómetros diarios. ${D}` },
  { id: 'zap-ultraboost', name: 'Zapatilla Ultraboost Light', brand: 'Adidas', category: 'running', type: 'calzado', price: 950000, compareAt: 1150000, images: [img.shoeAdidasWhite, img.shoeWalk], sizes: SHOE_SIZES, colors: ['Blanco', 'Gris'], stock: 15, rating: 4.8, reviews: 143, tags: ['oferta'], description: `La espuma BOOST más liviana de la historia. ${D}` },
  { id: 'zap-velocity', name: 'Zapatilla Velocity Nitro 3', brand: 'Puma', category: 'running', type: 'calzado', price: 720000, images: [img.shoeRed, img.shoeTraining], sizes: SHOE_SIZES, colors: ['Rojo', 'Negro'], stock: 27, rating: 4.6, reviews: 71, tags: [], description: `Espuma NITRO para máximo retorno de energía. ${D}` },
  { id: 'zap-wave', name: 'Zapatilla Wave Rider TR', brand: 'Fila', category: 'running', type: 'calzado', price: 480000, compareAt: 620000, images: [img.shoeTrail, img.shoeYellow], sizes: SHOE_SIZES, colors: ['Amarillo', 'Azul'], stock: 33, rating: 4.4, reviews: 47, tags: ['oferta'], description: `Zapatilla de trail con suela de agarre multiterreno. ${D}` },
  { id: 'rem-dryfit', name: 'Remera Dri-FIT Miler', brand: 'Nike', category: 'running', type: 'prenda', price: 165000, images: [img.teeWhite, img.runSunset], sizes: CLOTH_SIZES, colors: ['Blanco', 'Negro', 'Verde'], stock: 70, rating: 4.5, reviews: 52, tags: [], description: `Tejido que absorbe el sudor para correr fresco. ${D}` },
  { id: 'calza-run', name: 'Calza Larga Own The Run', brand: 'Adidas', category: 'running', type: 'prenda', price: 240000, images: [img.leggings, img.track], sizes: CLOTH_SIZES, colors: ['Negro'], stock: 38, rating: 4.7, reviews: 63, tags: ['bestseller'], description: `Calza con bolsillo trasero con cierre y detalles reflectivos. ${D}` },
  { id: 'campera-wind', name: 'Campera Rompeviento Fast-R', brand: 'New Balance', category: 'running', type: 'prenda', price: 380000, compareAt: 450000, images: [img.trackStart, img.runSunset], sizes: CLOTH_SIZES, colors: ['Verde', 'Negro'], stock: 20, rating: 4.5, reviews: 31, tags: ['oferta'], description: `Rompeviento plegable ultraliviano con capucha. ${D}` },

  // ── FITNESS ─────────────────────────────────────────
  { id: 'zap-metcon', name: 'Zapatilla Metcon 9', brand: 'Nike', category: 'fitness', type: 'calzado', price: 780000, images: [img.shoeBlackNike, img.gymMan], sizes: SHOE_SIZES, colors: ['Negro'], stock: 19, rating: 4.8, reviews: 96, tags: ['bestseller'], description: `Base estable para levantamientos y HIIT. ${D}` },
  { id: 'zap-nano', name: 'Zapatilla Nano X4', brand: 'Reebok', category: 'fitness', type: 'calzado', price: 690000, compareAt: 820000, images: [img.shoeTraining, img.shoeBlackSole], sizes: SHOE_SIZES, colors: ['Gris', 'Negro'], stock: 25, rating: 4.7, reviews: 84, tags: ['oferta'], description: `La zapatilla oficial del fitness, flexibilidad y soporte. ${D}` },
  { id: 'top-deportivo', name: 'Top Deportivo Swoosh', brand: 'Nike', category: 'fitness', type: 'prenda', price: 190000, images: [img.yoga, img.gymGirl], sizes: CLOTH_SIZES, colors: ['Negro', 'Rosa'], stock: 42, rating: 4.6, reviews: 58, tags: ['new'], description: `Sujeción media con banda elástica y espalda deportiva. ${D}` },
  { id: 'calza-biker', name: 'Calza Biker Studio Lux', brand: 'Puma', category: 'fitness', type: 'prenda', price: 175000, images: [img.leggings, img.yoga], sizes: CLOTH_SIZES, colors: ['Negro', 'Gris'], stock: 55, rating: 4.5, reviews: 44, tags: [], description: `Calza corta de tiro alto, tacto suave second-skin. ${D}` },
  { id: 'buzo-oversize', name: 'Buzo Oversize Essentials', brand: 'Adidas', category: 'fitness', type: 'prenda', price: 320000, compareAt: 390000, images: [img.hoodie, img.teeHanger], sizes: CLOTH_SIZES, colors: ['Gris', 'Negro', 'Verde'], stock: 36, rating: 4.7, reviews: 77, tags: ['oferta', 'bestseller'], description: `Buzo de algodón frisado con capucha, fit relajado. ${D}` },
  { id: 'guantes-gym', name: 'Guantes de Entrenamiento Pro', brand: 'Reebok', category: 'fitness', type: 'accesorio', price: 85000, images: [img.gymGirl, img.gym], sizes: ['S', 'M', 'L'], colors: ['Negro'], stock: 65, rating: 4.3, reviews: 22, tags: [], description: `Palma acolchada antideslizante, muñequera integrada. ${D}` },
  { id: 'botella-termica', name: 'Botella Térmica 750ml', brand: 'Under Armour', category: 'fitness', type: 'accesorio', price: 120000, images: [img.bottleBlack, img.bottle], sizes: ONE_SIZE, colors: ['Negro', 'Verde'], stock: 90, rating: 4.6, reviews: 41, tags: ['new'], description: `Mantiene tu bebida fría por 24 horas. Libre de BPA. ${D}` },

  // ── LIFESTYLE ───────────────────────────────────────
  { id: 'zap-af1', name: 'Zapatilla Air Force 1 ´07', brand: 'Nike', category: 'lifestyle', type: 'calzado', price: 850000, images: [img.shoeWhiteNike, img.shoeWalk], sizes: SHOE_SIZES, colors: ['Blanco'], stock: 28, rating: 4.9, reviews: 312, tags: ['bestseller'], description: `El clásico que nunca pasa de moda. Cuero premium. ${D}` },
  { id: 'zap-jordan', name: 'Zapatilla Jordan 1 Mid', brand: 'Nike', category: 'lifestyle', type: 'calzado', price: 1050000, compareAt: 1250000, images: [img.shoeJordan, img.shoeWall], sizes: SHOE_SIZES, colors: ['Rojo/Negro'], stock: 12, rating: 4.8, reviews: 156, tags: ['oferta', 'bestseller'], description: `Ícono del basket llevado a la calle. ${D}` },
  { id: 'zap-nmd', name: 'Zapatilla NMD_R1', brand: 'Adidas', category: 'lifestyle', type: 'calzado', price: 740000, images: [img.shoeNmd, img.shoeAdidasWhite], sizes: SHOE_SIZES, colors: ['Negro', 'Blanco'], stock: 21, rating: 4.6, reviews: 88, tags: [], description: `Comodidad BOOST con estilo urbano futurista. ${D}` },
  { id: 'zap-suede', name: 'Zapatilla Suede Classic XXI', brand: 'Puma', category: 'lifestyle', type: 'calzado', price: 420000, compareAt: 520000, images: [img.shoeVans, img.shoeBox], sizes: SHOE_SIZES, colors: ['Azul', 'Rojo', 'Negro'], stock: 34, rating: 4.5, reviews: 64, tags: ['oferta'], description: `El clásico de gamuza desde 1968. ${D}` },
  { id: 'zap-disruptor', name: 'Zapatilla Disruptor II', brand: 'Fila', category: 'lifestyle', type: 'calzado', price: 490000, images: [img.shoePairOrange, img.shoeWalk], sizes: SHOE_SIZES, colors: ['Blanco'], stock: 26, rating: 4.4, reviews: 73, tags: [], description: `Chunky sneaker con plataforma, estilo noventoso. ${D}` },
  { id: 'rem-boxy', name: 'Remera Boxy Club', brand: 'Umbro', category: 'lifestyle', type: 'prenda', price: 140000, images: [img.teeHanger, img.teeWhite], sizes: CLOTH_SIZES, colors: ['Blanco', 'Negro', 'Crema'], stock: 58, rating: 4.3, reviews: 29, tags: ['new'], description: `Remera de fit amplio con logo bordado. ${D}` },
  { id: 'buzo-crew', name: 'Buzo Crewneck Classics', brand: 'Reebok', category: 'lifestyle', type: 'prenda', price: 290000, images: [img.hoodie, img.teeWhite], sizes: CLOTH_SIZES, colors: ['Gris', 'Verde'], stock: 30, rating: 4.5, reviews: 35, tags: [], description: `Buzo cuello redondo de felpa francesa. ${D}` },

  // ── ACCESORIOS ──────────────────────────────────────
  { id: 'moch-elemental', name: 'Mochila Elemental 21L', brand: 'Nike', category: 'accesorios', type: 'accesorio', price: 260000, images: [img.backpack, img.backpackYellow], sizes: ONE_SIZE, colors: ['Negro', 'Amarillo'], stock: 44, rating: 4.6, reviews: 57, tags: ['bestseller'], description: `Mochila con compartimiento para notebook de 15". ${D}` },
  { id: 'moch-urban', name: 'Mochila Urban Roll-Top', brand: 'Adidas', category: 'accesorios', type: 'accesorio', price: 310000, compareAt: 380000, images: [img.backpackYellow, img.backpack], sizes: ONE_SIZE, colors: ['Amarillo', 'Negro'], stock: 23, rating: 4.5, reviews: 33, tags: ['oferta'], description: `Cierre roll-top resistente al agua. ${D}` },
  { id: 'gorra-heritage', name: 'Gorra Heritage86', brand: 'Nike', category: 'accesorios', type: 'accesorio', price: 130000, images: [img.cap, img.teeWhite], sizes: ONE_SIZE, colors: ['Negro', 'Blanco', 'Verde'], stock: 75, rating: 4.4, reviews: 48, tags: [], description: `Gorra ajustable de sarga lavada con logo bordado. ${D}` },
  { id: 'botinera-umbro', name: 'Botinera Team Kit', brand: 'Umbro', category: 'accesorios', type: 'accesorio', price: 130000, images: [img.backpack, img.bootsClose], sizes: ONE_SIZE, colors: ['Negro'], stock: 50, rating: 4.3, reviews: 21, tags: ['new'], description: `Botinera con ventilación y bolsillo exterior. ${D}` },
  { id: 'medias-crew3', name: 'Medias Crew Pack x3', brand: 'Puma', category: 'accesorios', type: 'accesorio', price: 90000, images: [img.teeWhite, img.shoeWalk], sizes: ['37-40', '41-44'], colors: ['Blanco', 'Negro'], stock: 110, rating: 4.5, reviews: 66, tags: [], description: `Pack de 3 pares de medias de algodón peinado. ${D}` },
  { id: 'riñonera', name: 'Riñonera Waistbag Core', brand: 'Fila', category: 'accesorios', type: 'accesorio', price: 110000, compareAt: 145000, images: [img.backpackYellow, img.cap], sizes: ONE_SIZE, colors: ['Negro', 'Verde'], stock: 39, rating: 4.2, reviews: 18, tags: ['oferta'], description: `Riñonera compacta con correa ajustable. ${D}` },
  { id: 'pelota-basket', name: 'Pelota de Básquet TF-250', brand: 'Spalding', category: 'accesorios', type: 'accesorio', price: 220000, images: [img.hoop, img.gym], sizes: ONE_SIZE, colors: ['Naranja'], stock: 32, rating: 4.7, reviews: 39, tags: [], description: `Pelota N°7 de cuero compuesto, indoor/outdoor. ${D}` },
]

export const categories: {
  slug: Category | 'todos'
  label: string
  tagline: string
  cover: string
  thumb: string
}[] = [
  { slug: 'todos', label: 'Todos', tagline: 'TODO EL DEPORTE EN UN SOLO LUGAR', cover: u('photo-1556906781-9a412961c28c', 1400), thumb: u('photo-1556906781-9a412961c28c', 500) },
  { slug: 'futbol', label: 'Fútbol', tagline: 'JUGÁ COMO LOCAL', cover: u('photo-1522778119026-d647f0596c20', 1400), thumb: u('photo-1517466787929-bc90951d0974', 500) },
  { slug: 'running', label: 'Running', tagline: 'SUMÁ KILÓMETROS', cover: u('photo-1461896836934-ffe607ba8211', 1400), thumb: u('photo-1552674605-db6ffd4facb5', 500) },
  { slug: 'fitness', label: 'Fitness', tagline: 'ENTRENÁ SIN EXCUSAS', cover: u('photo-1534438327276-14e5300c3a48', 1400), thumb: u('photo-1517836357463-d25dfeac3438', 500) },
  { slug: 'lifestyle', label: 'Lifestyle', tagline: 'ESTILO DE LA CALLE', cover: u('photo-1552346154-21d32810aba3', 1400), thumb: u('photo-1556906781-9a412961c28c', 500) },
  { slug: 'accesorios', label: 'Accesorios', tagline: 'COMPLETÁ TU EQUIPO', cover: u('photo-1553062407-98eeb64c6a62', 1400), thumb: u('photo-1553062407-98eeb64c6a62', 500) },
]

export const brands = ['Nike', 'Adidas', 'Puma', 'Fila', 'Umbro', 'Reebok', 'New Balance', 'Under Armour', 'Spalding']

export const heroSlides = [
  {
    id: 'mega-outlet',
    image: u('photo-1512374382149-233c42b6a83b', 1600),
    kicker: 'SOLO POR ESTA SEMANA',
    title: 'MEGA OUTLET',
    subtitle: 'Hasta 70% OFF en todas las marcas, en un solo lugar.',
    cta: 'Ver ofertas',
    to: '/productos?tag=oferta',
    theme: 'dark' as const,
  },
  {
    id: 'albirroja',
    image: u('photo-1522778119026-d647f0596c20', 1600),
    kicker: 'NUEVA TEMPORADA',
    title: 'VESTÍ LA ALBIRROJA',
    subtitle: 'La camiseta oficial 2026 ya está en Larel.',
    cta: 'Comprar ahora',
    to: '/p/cam-albirroja',
    theme: 'dark' as const,
  },
  {
    id: 'running',
    image: u('photo-1552674605-db6ffd4facb5', 1600),
    kicker: 'COLECCIÓN RUNNING',
    title: 'SUMÁ KILÓMETROS',
    subtitle: 'Las zapatillas que te llevan más lejos.',
    cta: 'Ver running',
    to: '/c/running',
    theme: 'dark' as const,
  },
]

/** Bento collections — `span` drives the desktop grid layout. */
export const collections: {
  id: string
  title: string
  kicker: string
  image: string
  to: string
  span: string
}[] = [
  { id: 'albirroja', title: 'Modo Albirroja', kicker: 'Selección 2026', image: u('photo-1522778119026-d647f0596c20', 1200), to: '/c/futbol', span: 'md:col-span-2 md:row-span-2' },
  { id: 'gym', title: 'Team Gym', kicker: 'Entrenamiento', image: u('photo-1534438327276-14e5300c3a48', 900), to: '/c/fitness', span: 'md:col-span-2' },
  { id: 'street', title: 'Street Style', kicker: 'Lifestyle', image: u('photo-1552346154-21d32810aba3', 900), to: '/c/lifestyle', span: 'md:col-span-1' },
  { id: 'km', title: 'Sumá kilómetros', kicker: 'Running', image: u('photo-1552674605-db6ffd4facb5', 900), to: '/c/running', span: 'md:col-span-1' },
  { id: 'kids', title: 'Vuelta al cole', kicker: 'Mochilas y bolsos', image: u('photo-1553062407-98eeb64c6a62', 900), to: '/c/accesorios', span: 'md:col-span-2' },
  { id: 'outlet', title: 'Outlet hasta -70%', kicker: 'Última oportunidad', image: u('photo-1512374382149-233c42b6a83b', 1200), to: '/productos?tag=oferta', span: 'md:col-span-2' },
]

/** Brand cards for the wireframe's large-card carousel. */
export const brandCards: { name: string; tagline: string; image: string }[] = [
  { name: 'Nike', tagline: 'Just Do It', image: u('photo-1542291026-7eec264c27ff', 1000) },
  { name: 'Adidas', tagline: 'Impossible is Nothing', image: u('photo-1579338559194-a162d19bf842', 1000) },
  { name: 'Puma', tagline: 'Forever Faster', image: u('photo-1608231387042-66d1773070a5', 1000) },
  { name: 'Fila', tagline: 'Heritage sport', image: u('photo-1491553895911-0055eca6402d', 1000) },
  { name: 'Umbro', tagline: 'Hecho para la cancha', image: u('photo-1517466787929-bc90951d0974', 1000) },
  { name: 'Reebok', tagline: 'Sport the unexpected', image: u('photo-1539185441755-769473a23570', 1000) },
]

export const getProduct = (id: string) => products.find((p) => p.id === id)

export const related = (p: Product, n = 8) =>
  products.filter((x) => x.id !== p.id && (x.category === p.category || x.brand === p.brand)).slice(0, n)
