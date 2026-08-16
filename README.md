# Larel — Demo Ecommerce

Demo de tienda online para **Larel** (larelpy), tienda deportiva de Ciudad del Este.
Mobile-first, con carrito, cupones, checkout simulado, panel admin y mi cuenta.

## Correr la demo

```bash
npm install
npm run dev
```

Abrir http://localhost:5173 (o el puerto que indique la consola).

- **Vista mobile rápida**: http://localhost:5173/mobile-preview.html (iframe de 390px)
- **Panel admin**: `/admin` (también linkeado desde el footer)
- **Mi cuenta**: `/cuenta` (usuaria demo pre-logueada)

## Cupones de prueba

| Código | Efecto |
|---|---|
| `LAREL10` | −10% en todo |
| `OUTLET20` | −20% desde Gs. 400.000 |
| `ENVIOGRATIS` | Envío gratis sin mínimo |

Los cupones creados en **Admin → Promos** funcionan al instante en el carrito.

## Stack

Vite · React · TypeScript · Tailwind CSS 4 · Zustand (persist) · React Router · lucide-react · [boneyard-js](https://boneyard.vercel.app) (skeletons)

### Animaciones

Sin librería de animación: todo es CSS + `IntersectionObserver` (0 kb extra frente a los ~70 kb de GSAP).

- `<Reveal>` (`src/components/Reveal.tsx`) — blur-in al entrar en viewport, con `delay` para stagger.
- Entrada de página — clases `.enter-hero` / `.enter-item` / `.enter-header` en `index.css`, encadenadas con la variable `--enter-delay`: hero → contenido del hero → header → ticker.
- Drawers — `.app-shell[data-dimmed]` difumina todo lo que queda detrás del carrito o la búsqueda; `.drawer-title` / `.drawer-body` animan el contenido que entra.
- Todo respeta `prefers-reduced-motion`.

### Skeletons (boneyard)

Los skeletons se generan a partir de la UI real, así que copian el shape exacto de cada
componente. **Cada vez que cambia un layout hay que recapturarlos**:

```bash
# con el dev server corriendo (ajustá el puerto)
npx boneyard-js build http://localhost:5173 --no-scan --force
```

Las rutas capturadas están en `boneyard.config.json`; los bones y el registry en `src/bones/`.

> Se usa el CLI en vez del plugin de Vite a propósito: el plugin recaptura en cada HMR y
> recarga la página en loop mientras se edita.

## Notas

- Todo es mock: productos, precios, ventas y clientes son ilustrativos (fotos de Unsplash).
- Carrito, wishlist, pedidos y cambios del admin persisten en `localStorage`.
