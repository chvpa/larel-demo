export type Category = 'calzados' | 'prendas' | 'accesorios'

/** Un producto = un SKU del stock. Los talles son las filas del CSV agrupadas. */
export type Product = {
  id: string
  sku: string
  /** Código interno, correlativo: sirve para ordenar por ingreso. */
  code: number
  name: string
  brand: string
  category: Category
  /** Categoría fina del stock: "Calzado deportivo", "Bolsos y mochilas", … */
  subcategory: string
  gender?: string
  price: number
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  description: string
}

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

/** Fotos editoriales (no son productos): hero, portadas de categoría y bento. */
export const IMG = {
  shoeWall: u('photo-1543508282-6319a3e2621f'),
}

/** Generado desde demo-productos/stock-demo.csv — no editar a mano. */
export const products: Product[] = [
  // <catalogo>
  // ── CALZADOS ──────────────────────────────────────────
  { id: "iq2390900", sku: "IQ2390900", code: 21512, name: "Nike Phantom 6 High Acad Fg Blanco/Rosa", brand: "Nike", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 700000, images: ["/productos/IQ2390900-1.webp","/productos/IQ2390900-2.webp"], sizes: ["8","9","9.5","10","10.5"], colors: ["Blanco"], stock: 7, description: "Calzado Deportivo Nike para hombre en color blanco. Talles disponibles: 8, 9, 9.5, 10, 10.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "jq8645", sku: "JQ8645", code: 21459, name: "Adidas Galaxy Star 2.0 U Negro/Blanco", brand: "Adidas", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 550000, images: ["/productos/JQ8645-1.webp","/productos/JQ8645-2.webp"], sizes: ["9.5","11"], colors: ["Negro"], stock: 2, description: "Calzado Deportivo Adidas para hombre en color negro. Talles disponibles: 9.5, 11. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "m8801zt", sku: "M8801ZT", code: 20526, name: "New Balance 880 Gris/Verde", brand: "New Balance", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 970000, images: ["/productos/M8801ZT-1.webp","/productos/M8801ZT-2.webp"], sizes: ["7","7.5","8","8.5","9","9.5","10","10.5","11.5","12"], colors: ["Gris"], stock: 15, description: "Calzado Deportivo New Balance para hombre en color gris. Talles disponibles: 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "c2099644ns", sku: "C2099644NS", code: 18537, name: "Crocs Inmotion Celeste Blanco", brand: "Crocs", category: "calzados", subcategory: "Ojotas y sandalias", gender: "Mujer", price: 420000, images: ["/productos/C2099644NS-1.webp","/productos/C2099644NS-2.webp"], sizes: ["4","8","12","13"], colors: ["Celeste"], stock: 4, description: "Ojotas Y Sandalias Crocs para mujer en color celeste. Talles disponibles: 4, 8, 12, 13. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "3028512428", sku: "3028512428", code: 16602, name: "Under Ua Lockdown Blanco/Celeste", brand: "Under Armour", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 730000, images: ["/productos/3028512428-1.webp","/productos/3028512428-2.webp"], sizes: ["8","8.5","9.5","10","10.5","11","12","13"], colors: ["Blanco"], stock: 10, description: "Calzado Deportivo Under Armour para hombre en color blanco. Talles disponibles: 8, 8.5, 9.5, 10, 10.5, 11, 12, 13. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "fb1802400", sku: "FB1802400", code: 17650, name: "Jordan Zion 4 Azul/Negro", brand: "Jordan", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 1290000, images: ["/productos/FB1802400-1.webp","/productos/FB1802400-2.webp"], sizes: ["7.5","8","10","10.5"], colors: ["Azul"], stock: 5, description: "Calzado Deportivo Jordan para hombre en color azul. Talles disponibles: 7.5, 8, 10, 10.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "43263432voa", sku: "43263432VOA", code: 21885, name: "Olympikus Vos 3 Negro/Marron", brand: "Olympikus", category: "calzados", subcategory: "Calzado deportivo", gender: "Mujer", price: 440000, images: ["/productos/43263432VOA-1.webp","/productos/43263432VOA-2.webp"], sizes: ["36","37","38","39"], colors: ["Negro"], stock: 6, description: "Calzado Deportivo Olympikus para mujer en color negro. Talles disponibles: 36, 37, 38, 39. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "tsets2501c", sku: "TSETS2501C", code: 18392, name: "Joma Set Men Negro/Turquesa", brand: "Joma", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 735000, images: ["/productos/TSETS2501C-1.webp","/productos/TSETS2501C-2.webp"], sizes: ["45"], colors: ["Negro"], stock: 1, description: "Calzado Deportivo Joma para hombre en color negro. Talles disponibles: 45. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "1012b650100", sku: "1012B650100", code: 18399, name: "Asics Novablast 4 Rosa/Blanco", brand: "Asics", category: "calzados", subcategory: "Calzado deportivo", gender: "Mujer", price: 1485000, images: ["/productos/1012B650100-1.webp","/productos/1012B650100-2.webp"], sizes: ["5.5","7","7.5"], colors: ["Rosa"], stock: 6, description: "Calzado Deportivo Asics para mujer en color rosa. Talles disponibles: 5.5, 7, 7.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "p312427", sku: "P312427", code: 20717, name: "Bota Cat Fandom Hiker Marron", brand: "Cat", category: "calzados", subcategory: "Calzados casuales", gender: "Mujer", price: 980000, images: ["/productos/P312427-1.webp","/productos/P312427-2.webp"], sizes: ["5","5.5","6","6.5","7"], colors: ["Marron"], stock: 6, description: "Calzados Casuales Cat para mujer en color marron. Talles disponibles: 5, 5.5, 6, 6.5, 7. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "u01fb042210", sku: "U01FB042210", code: 19280, name: "Umbreo Pro 5 Club Gris/Rosa", brand: "Umbro", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 750000, images: ["/productos/U01FB042210-1.webp","/productos/U01FB042210-2.webp"], sizes: ["41","42","44"], colors: ["Gris"], stock: 4, description: "Calzado Deportivo Umbro para hombre en color gris. Talles disponibles: 41, 42, 44. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "w6721222272", sku: "W6721222272", code: 18740, name: "Alpargata 361 Gris/Blanco", brand: "361", category: "calzados", subcategory: "Ojotas y sandalias", price: 240000, images: ["/productos/W6721222272-1.webp","/productos/W6721222272-2.webp"], sizes: ["8","8.5","9","10","10.5"], colors: ["Gris"], stock: 9, description: "Ojotas Y Sandalias 361 en color gris. Talles disponibles: 8, 8.5, 9, 10, 10.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "232466bkgy", sku: "232466BKGY", code: 17786, name: "Skechers Slip Ins Negro/Blanco", brand: "Skechers", category: "calzados", subcategory: "Calzado deportivo", gender: "Hombre", price: 650000, images: ["/productos/232466BKGY-1.webp","/productos/232466BKGY-2.webp"], sizes: ["7.5","8","9","10","10.5"], colors: ["Negro"], stock: 8, description: "Calzado Deportivo Skechers para hombre en color negro. Talles disponibles: 7.5, 8, 9, 10, 10.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "100209990", sku: "100209990", code: 17920, name: "Reebok Glide Unisex Blanco/Verde", brand: "Reebook", category: "calzados", subcategory: "Calzado deportivo", price: 580000, images: ["/productos/100209990-1.webp","/productos/100209990-2.webp"], sizes: ["8","9.5","10","10.5","11"], colors: ["Blanco"], stock: 6, description: "Calzado Deportivo Reebook en color blanco. Talles disponibles: 8, 9.5, 10, 10.5, 11. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "wz4024510xb7", sku: "WZ4024510XB7", code: 20419, name: "Wilson Basket Gs Warriors", brand: "Wilson", category: "calzados", subcategory: "Calzado deportivo", price: 160000, images: ["/productos/WZ4024510XB7-1.webp","/productos/WZ4024510XB7-2.webp"], sizes: ["7"], colors: [], stock: 3, description: "Calzado Deportivo Wilson. Talles disponibles: 7. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "vn0a45nmiju", sku: "VN0A45NMIJU", code: 17969, name: "Vans Filmore Decon Negro/Blanco", brand: "Vans", category: "calzados", subcategory: "Calzado deportivo", gender: "Unisex", price: 460000, images: ["/productos/VN0A45NMIJU-1.webp","/productos/VN0A45NMIJU-2.webp"], sizes: ["7.5"], colors: ["Negro"], stock: 2, description: "Calzado Deportivo Vans para unisex en color negro. Talles disponibles: 7.5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },

  // ── PRENDAS ───────────────────────────────────────────
  { id: "dq5471504", sku: "DQ5471504", code: 21580, name: "Campera Nike Nsw Club Rosa", brand: "Nike", category: "prendas", subcategory: "Indumentaria superior", gender: "Mujer", price: 450000, images: ["/productos/DQ5471504-1.webp","/productos/DQ5471504-2.webp"], sizes: ["M"], colors: ["Rosado"], stock: 1, description: "Indumentaria Superior Nike para mujer en color rosado. Talles disponibles: M. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "jv9902", sku: "JV9902", code: 21858, name: "Hooddie Adidas Bl Azul", brand: "Adidas", category: "prendas", subcategory: "Conjuntos y abrigos", gender: "Mujer", price: 295000, images: ["/productos/JV9902-1.webp","/productos/JV9902-2.webp"], sizes: ["M","L","XL"], colors: ["Azul"], stock: 5, description: "Conjuntos Y Abrigos Adidas para mujer en color azul. Talles disponibles: M, L, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "1379517477", sku: "1379517477", code: 21400, name: "Hoddie Under Verde", brand: "Under Armour", category: "prendas", subcategory: "Indumentaria superior", gender: "Mujer", price: 300000, images: ["/productos/1379517477-1.webp","/productos/1379517477-2.webp"], sizes: ["M"], colors: ["Verde"], stock: 1, description: "Indumentaria Superior Under Armour para mujer en color verde. Talles disponibles: M. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "wp41500ovn", sku: "WP41500OVN", code: 17269, name: "Jogger Nb Verde", brand: "New Balance", category: "prendas", subcategory: "Indumentaria inferior", gender: "Mujer", price: 350000, images: ["/productos/WP41500OVN-1.webp","/productos/WP41500OVN-2.webp"], sizes: ["XL"], colors: ["Verde"], stock: 1, description: "Indumentaria Inferior New Balance para mujer en color verde. Talles disponibles: XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "52661001", sku: "52661001", code: 18165, name: "Short Puma Dry Run Negro", brand: "Puma", category: "prendas", subcategory: "Indumentaria inferior", gender: "Hombre", price: 415000, images: ["/productos/52661001-1.webp","/productos/52661001-2.webp"], sizes: ["S","XL","XXL"], colors: ["Negro"], stock: 4, description: "Indumentaria Inferior Puma para hombre en color negro. Talles disponibles: S, XL, XXL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "95f315023", sku: "95F315023", code: 19740, name: "Remera Jordan Comic Negro/Amarillo", brand: "Jordan", category: "prendas", subcategory: "Indumentaria superior", gender: "Hombre", price: 210000, images: ["/productos/95F315023-1.webp","/productos/95F315023-2.webp"], sizes: ["M"], colors: ["Negro"], stock: 2, description: "Indumentaria Superior Jordan para hombre en color negro. Talles disponibles: M. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "2042a316704", sku: "2042A316704", code: 18876, name: "Musculosa Asics Rosado", brand: "Asics", category: "prendas", subcategory: "Indumentaria superior", gender: "Mujer", price: 375000, images: ["/productos/2042A316704-1.webp","/productos/2042A316704-2.webp"], sizes: ["XS","S","L"], colors: ["Rosado"], stock: 5, description: "Indumentaria Superior Asics para mujer en color rosado. Talles disponibles: XS, S, L. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "fifjs0047rd2", sku: "FIFJS0047RD2", code: 21409, name: "Camiseta España H Wc26", brand: "Sin Marca", category: "prendas", subcategory: "Prendas", gender: "Hombre", price: 200000, images: ["/productos/FIFJS0047RD2-1.webp","/productos/FIFJS0047RD2-2.webp"], sizes: ["L","XL"], colors: [], stock: 2, description: "Prendas Sin Marca para hombre. Talles disponibles: L, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "ev55hcm281", sku: "EV55HCM281", code: 19537, name: "Short Con Calza Everlast Negro", brand: "Everlast", category: "prendas", subcategory: "Indumentaria inferior", price: 240000, images: ["/productos/EV55HCM281-1.webp","/productos/EV55HCM281-2.webp"], sizes: ["S","XL"], colors: ["Negro"], stock: 2, description: "Indumentaria Inferior Everlast en color negro. Talles disponibles: S, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "vn000st5y28", sku: "VN000ST5Y28", code: 21710, name: "Hoodie Vans Stacked Hi Negro", brand: "Vans", category: "prendas", subcategory: "Conjuntos y abrigos", gender: "Unisex", price: 415000, images: ["/productos/VN000ST5Y28-1.webp","/productos/VN000ST5Y28-2.webp"], sizes: ["S","M","XL"], colors: ["Negro"], stock: 4, description: "Conjuntos Y Abrigos Vans para unisex en color negro. Talles disponibles: S, M, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "404022010121cat", sku: "404022010121CAT", code: 21559, name: "Campera Cat Insulate Work Negro", brand: "Cat", category: "prendas", subcategory: "Indumentaria superior", gender: "Hombre", price: 730000, images: ["/productos/404022010121CAT-1.webp","/productos/404022010121CAT-2.webp"], sizes: ["S","L","XL"], colors: ["Negro"], stock: 4, description: "Indumentaria Superior Cat para hombre en color negro. Talles disponibles: S, L, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "166988", sku: "166988", code: 18945, name: "Remera Topper Negro", brand: "Topper", category: "prendas", subcategory: "Indumentaria superior", price: 110000, images: ["/productos/166988-1.webp","/productos/166988-2.webp"], sizes: ["XL"], colors: ["Negro"], stock: 2, description: "Indumentaria Superior Topper en color negro. Talles disponibles: XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "fifjs0047nv1", sku: "FIFJS0047NV1", code: 21566, name: "Remera Fex Pro Francia", brand: "Fex Pro", category: "prendas", subcategory: "Indumentaria superior", gender: "Hombre", price: 200000, images: ["/productos/FIFJS0047NV1-1.webp","/productos/FIFJS0047NV1-2.webp"], sizes: ["M","L"], colors: [], stock: 3, description: "Indumentaria Superior Fex Pro para hombre. Talles disponibles: M, L. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "im8586", sku: "IM8586", code: 19062, name: "Musculosa Adizero Negro", brand: "Lotto", category: "prendas", subcategory: "Indumentaria superior", price: 235000, images: ["/productos/IM8586-1.webp","/productos/IM8586-2.webp"], sizes: ["M","XL"], colors: ["Negro"], stock: 3, description: "Indumentaria Superior Lotto en color negro. Talles disponibles: M, XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "100215505", sku: "100215505", code: 21069, name: "Sweater Reebok Blanco/Azul", brand: "Reebook", category: "prendas", subcategory: "Indumentaria superior", gender: "Unisex", price: 390000, images: ["/productos/100215505-1.webp","/productos/100215505-2.webp"], sizes: ["L"], colors: ["Blanco"], stock: 1, description: "Indumentaria Superior Reebook para unisex en color blanco. Talles disponibles: L. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "im9795010", sku: "IM9795010", code: 21579, name: "Hooddie Nike Jumpman Negro", brand: "Nike", category: "prendas", subcategory: "Indumentaria superior", gender: "Hombre", price: 385000, images: ["/productos/IM9795010-1.webp","/productos/IM9795010-2.webp"], sizes: ["XL"], colors: ["Negro"], stock: 1, description: "Indumentaria Superior Nike para hombre en color negro. Talles disponibles: XL. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "jn1970", sku: "JN1970", code: 21148, name: "Short Pollera Adidas Negro", brand: "Adidas", category: "prendas", subcategory: "Indumentaria inferior", gender: "Mujer", price: 300000, images: ["/productos/JN1970-1.webp","/productos/JN1970-2.webp"], sizes: ["XS","S","M","L"], colors: ["Negro"], stock: 4, description: "Indumentaria Inferior Adidas para mujer en color negro. Talles disponibles: XS, S, M, L. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },

  // ── ACCESORIOS ────────────────────────────────────────
  { id: "hq0257010", sku: "HQ0257010", code: 15385, name: "Guante De Arquero Nike Negro/Blanco", brand: "Nike", category: "accesorios", subcategory: "Accesorios", gender: "Unisex", price: 225000, images: ["/productos/HQ0257010-1.webp","/productos/HQ0257010-2.webp"], sizes: ["6","7","8"], colors: ["Negro/Blanco"], stock: 5, description: "Accesorios Nike para unisex en color negro/blanco. Talles disponibles: 6, 7, 8. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "jc6453", sku: "JC6453", code: 17891, name: "Media Adidas 1/4 Negro/Gris", brand: "Adidas", category: "accesorios", subcategory: "Medias", gender: "Unisex", price: 120000, images: ["/productos/JC6453-1.webp","/productos/JC6453-2.webp"], sizes: ["S"], colors: ["Negro"], stock: 1, description: "Medias Adidas para unisex en color negro. Talles disponibles: S. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "05475702", sku: "05475702", code: 18917, name: "Billetera Puma Azul", brand: "Puma", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 75000, images: ["/productos/05475702-1.webp","/productos/05475702-2.webp"], sizes: ["Único"], colors: ["Azul"], stock: 1, description: "Bolsos Y Mochilas Puma para unisex en color azul. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "65aa015g", sku: "65AA015G", code: 19380, name: "Mochila Wilson Verde/Gris", brand: "Wilson", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 110000, images: ["/productos/65AA015G-1.webp","/productos/65AA015G-2.webp"], sizes: ["Único"], colors: ["Verde"], stock: 4, description: "Bolsos Y Mochilas Wilson para unisex en color verde. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "1380922490", sku: "1380922490", code: 11247, name: "Bandolera Under Celeste/Rosa", brand: "Under Armour", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 330000, images: ["/productos/1380922490-1.webp","/productos/1380922490-2.webp"], sizes: ["Único"], colors: ["Celeste"], stock: 3, description: "Bolsos Y Mochilas Under Armour para unisex en color celeste. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "1241116893", sku: "1241116893", code: 11621, name: "Short De Baño Negro/Gris", brand: "Speedo", category: "accesorios", subcategory: "Natación", gender: "Hombre", price: 240000, images: ["/productos/1241116893-1.webp","/productos/1241116893-2.webp"], sizes: ["34"], colors: ["Negro"], stock: 1, description: "Natación Speedo para hombre en color negro. Talles disponibles: 34. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "dx9632010", sku: "DX9632010", code: 7807, name: "Media Jordan 3 1/4 Negra", brand: "Jordan", category: "accesorios", subcategory: "Medias", gender: "Unisex", price: 160000, images: ["/productos/DX9632010-1.webp","/productos/DX9632010-2.webp"], sizes: ["M"], colors: ["Negra"], stock: 1, description: "Medias Jordan para unisex en color negra. Talles disponibles: M. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "tt32ps001", sku: "TT32PS001", code: 14609, name: "Vaso Hydro Negro 32 Oz", brand: "Hydro Flask", category: "accesorios", subcategory: "Hidratación y accesorios", gender: "Unisex", price: 245000, images: ["/productos/TT32PS001-1.webp","/productos/TT32PS001-2.webp"], sizes: ["Único"], colors: ["Negro"], stock: 2, description: "Hidratación Y Accesorios Hydro Flask para unisex en color negro. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "800233214502", sku: "800233214502", code: 18552, name: "Lentes De Natacion Biofuse 2.0", brand: "Sin Marca", category: "accesorios", subcategory: "Natación", gender: "Unisex", price: 160000, images: ["/productos/800233214502-1.webp","/productos/800233214502-2.webp"], sizes: ["Único"], colors: [], stock: 8, description: "Natación Sin Marca para unisex. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "84350677", sku: "84350677", code: 20938, name: "Mochila Cat Gris/Negro", brand: "Cat", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 390000, images: ["/productos/84350677-1.webp","/productos/84350677-2.webp"], sizes: ["Único"], colors: ["Gris"], stock: 4, description: "Bolsos Y Mochilas Cat para unisex en color gris. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "u23eq045444u", sku: "U23EQ045444U", code: 22084, name: "Cinta Capitan Umbro Rojo", brand: "Umbro", category: "accesorios", subcategory: "Accesorios", gender: "Unisex", price: 65000, images: ["/productos/U23EQ045444U-1.webp","/productos/U23EQ045444U-2.webp"], sizes: ["Único"], colors: ["Rojo"], stock: 6, description: "Accesorios Umbro para unisex en color rojo. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "5214111710", sku: "5214111710", code: 20154, name: "Pelota Penalty Fs Lider Blanco/Naranja", brand: "Penalty", category: "accesorios", subcategory: "Pelotas y redes", gender: "Unisex", price: 220000, images: ["/productos/5214111710-1.webp","/productos/5214111710-2.webp"], sizes: ["5"], colors: ["Blanco"], stock: 6, description: "Pelotas Y Redes Penalty para unisex en color blanco. Talles disponibles: 5. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "321m85w005", sku: "321M85W005", code: 17982, name: "Bolson Kappa Negro", brand: "Kappa", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 250000, images: ["/productos/321M85W005-1.webp","/productos/321M85W005-2.webp"], sizes: ["M"], colors: ["Negro"], stock: 1, description: "Bolsos Y Mochilas Kappa para unisex en color negro. Talles disponibles: M. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "cp031", sku: "CP031", code: 13707, name: "Protector De Zapatillas Crep", brand: "Crep Protect", category: "accesorios", subcategory: "Hidratación y accesorios", gender: "Unisex", price: 100000, images: ["/productos/CP031-1.webp","/productos/CP031-2.webp"], sizes: ["Único"], colors: [], stock: 3, description: "Hidratación Y Accesorios Crep Protect para unisex. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "b7g2000m3p", sku: "B7G2000M3P", code: 20417, name: "Molten Rubber Basket Fiba", brand: "Molten", category: "accesorios", subcategory: "Pelotas y redes", gender: "Unisex", price: 130000, images: ["/productos/B7G2000M3P-1.webp","/productos/B7G2000M3P-2.webp"], sizes: ["7"], colors: [], stock: 11, description: "Pelotas Y Redes Molten para unisex. Talles disponibles: 7. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  { id: "vn000c32ba5", sku: "VN000C32BA5", code: 2202, name: "Billetera Vans", brand: "Vans", category: "accesorios", subcategory: "Bolsos y mochilas", gender: "Unisex", price: 105000, images: ["/productos/VN000C32BA5-1.webp","/productos/VN000C32BA5-2.webp"], sizes: ["Único"], colors: [], stock: 1, description: "Bolsos Y Mochilas Vans para unisex. Talles disponibles: Único. Producto original con garantía oficial. Retiralo en nuestras sucursales de Ciudad del Este o Hernandarias, o recibilo en tu casa." },
  // </catalogo>
]

export const categories: {
  slug: Category | 'todos'
  label: string
  tagline: string
  cover: string
  thumb: string
}[] = [
  { slug: 'todos', label: 'Todos', tagline: 'TODO EL DEPORTE EN UN SOLO LUGAR', cover: u('photo-1556906781-9a412961c28c', 1400), thumb: u('photo-1556906781-9a412961c28c', 500) },
  { slug: 'calzados', label: 'Calzados', tagline: 'PISÁ FUERTE', cover: u('photo-1552346154-21d32810aba3', 1400), thumb: u('photo-1595950653106-6c9ebd614d3a', 500) },
  { slug: 'prendas', label: 'Prendas', tagline: 'ENTRENÁ CON ESTILO', cover: u('photo-1556821840-3a63f95609a7', 1400), thumb: u('photo-1521572163474-6864f9cf17ab', 500) },
  { slug: 'accesorios', label: 'Accesorios', tagline: 'COMPLETÁ TU EQUIPO', cover: u('photo-1553062407-98eeb64c6a62', 1400), thumb: u('photo-1553062407-98eeb64c6a62', 500) },
]

export const brands = [...new Set(products.map((p) => p.brand))].sort()

/** Subcategorías reales del stock, para el filtro "Tipo de producto". */
export const subcategories = [...new Set(products.map((p) => p.subcategory))].sort()

export const heroSlides = [
  {
    id: 'temporada',
    image: u('photo-1512374382149-233c42b6a83b', 1600),
    kicker: 'NUEVA TEMPORADA',
    title: 'LAS MARCAS QUE BUSCÁS',
    subtitle: 'Nike, adidas, Jordan, New Balance y más, con garantía oficial.',
    cta: 'Ver catálogo',
    to: '/productos',
    theme: 'dark' as const,
  },
  {
    id: 'calzados',
    image: u('photo-1552346154-21d32810aba3', 1600),
    kicker: 'CALZADOS',
    title: 'PISÁ FUERTE',
    subtitle: 'Running, básquet, fútbol y urbano. Todos los talles disponibles.',
    cta: 'Ver calzados',
    to: '/c/calzados',
    theme: 'dark' as const,
  },
  {
    id: 'accesorios',
    image: u('photo-1553062407-98eeb64c6a62', 1600),
    kicker: 'ACCESORIOS',
    title: 'COMPLETÁ TU EQUIPO',
    subtitle: 'Mochilas, pelotas, medias y todo lo que falta en tu bolso.',
    cta: 'Ver accesorios',
    to: '/c/accesorios',
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
  { id: 'calzados', title: 'Calzados', kicker: 'Deportivo y urbano', image: u('photo-1552346154-21d32810aba3', 1200), to: '/c/calzados', span: 'md:col-span-2 md:row-span-2' },
  { id: 'prendas', title: 'Prendas', kicker: 'Indumentaria', image: u('photo-1556821840-3a63f95609a7', 900), to: '/c/prendas', span: 'md:col-span-2' },
  { id: 'nike', title: 'Modo Nike', kicker: 'Marca destacada', image: u('photo-1542291026-7eec264c27ff', 900), to: '/productos?marca=Nike', span: 'md:col-span-1' },
  { id: 'jordan', title: 'Jordan', kicker: 'Básquet', image: u('photo-1556906781-9a412961c28c', 900), to: '/productos?marca=Jordan', span: 'md:col-span-1' },
  { id: 'accesorios', title: 'Mochilas y bolsos', kicker: 'Accesorios', image: u('photo-1553062407-98eeb64c6a62', 900), to: '/c/accesorios', span: 'md:col-span-2' },
  { id: 'adidas', title: 'Modo adidas', kicker: 'Marca destacada', image: u('photo-1579338559194-a162d19bf842', 1200), to: '/productos?marca=Adidas', span: 'md:col-span-2' },
]

/** Brand cards for the wireframe's large-card carousel. */
export const brandCards: { name: string; tagline: string; image: string }[] = [
  { name: 'Nike', tagline: 'Just Do It', image: u('photo-1542291026-7eec264c27ff', 1000) },
  { name: 'Adidas', tagline: 'Impossible is Nothing', image: u('photo-1579338559194-a162d19bf842', 1000) },
  { name: 'Puma', tagline: 'Forever Faster', image: u('photo-1608231387042-66d1773070a5', 1000) },
  { name: 'Jordan', tagline: 'Become Legendary', image: u('photo-1556906781-9a412961c28c', 1000) },
  { name: 'New Balance', tagline: 'Fearlessly Independent', image: u('photo-1539185441755-769473a23570', 1000) },
  { name: 'Vans', tagline: 'Off The Wall', image: u('photo-1491553895911-0055eca6402d', 1000) },
]

export const getProduct = (id: string) => products.find((p) => p.id === id)

export const related = (p: Product, n = 8) =>
  products.filter((x) => x.id !== p.id && (x.subcategory === p.subcategory || x.brand === p.brand)).slice(0, n)

/** Últimos ingresos según código interno (correlativo del sistema de stock). */
export const latest = (n = 8) => [...products].sort((a, b) => b.code - a.code).slice(0, n)

/** Poco stock: lo que está por agotarse. */
export const lowStock = (n = 8) => products.filter((p) => p.stock <= 2).slice(0, n)
