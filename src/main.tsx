import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureBoneyard } from 'boneyard-js/react'
import './index.css'
import './bones/registry'
import App from './App.tsx'

// El CLI indexa las capturas por ancho de viewport, pero el runtime elige el
// breakpoint por ancho del contenedor. Con sidebars (PLP, cuenta, admin) el
// contenedor es más angosto que la ventana y elegía un breakpoint capturado en
// otro layout: los huesos se estiraban a lo ancho con el alto fijo y las cards
// salían achatadas.
configureBoneyard({ select: 'viewport' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
