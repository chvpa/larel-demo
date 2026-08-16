import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { Footer } from './components/Footer'
import { SideCart } from './components/SideCart'
import { SearchOverlay } from './components/SearchOverlay'
import { useUi } from './store/ui'
import { Home } from './pages/Home'
import { Plp } from './pages/Plp'
import { Pdp } from './pages/Pdp'
import { Checkout } from './pages/Checkout'
import { AccountLayout } from './pages/account/AccountLayout'
import { Overview } from './pages/account/Overview'
import { Orders } from './pages/account/Orders'
import { Wishlist } from './pages/account/Wishlist'
import { Preferences } from './pages/account/Preferences'
import { Settings } from './pages/account/Settings'
import { AdminLayout } from './pages/admin/AdminLayout'
import { Sales } from './pages/admin/Sales'
import { Customers } from './pages/admin/Customers'
import { Stock } from './pages/admin/Stock'
import { Promos } from './pages/admin/Promos'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function StoreLayout() {
  const dimmed = useUi((s) => s.cartOpen || s.searchOpen)

  return (
    <div className="overflow-x-clip">
      {/* Everything behind the overlays — blurs out when a drawer opens */}
      <div className="app-shell pb-16 md:pb-0" data-dimmed={dimmed}>
        <Header />
        <main className="min-h-[60dvh]">
          <Outlet />
        </main>
        <Footer />
        <BottomNav />
      </div>
      <SideCart />
      <SearchOverlay />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Plp />} />
          <Route path="/c/:cat" element={<Plp />} />
          <Route path="/p/:id" element={<Pdp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cuenta" element={<AccountLayout />}>
            <Route index element={<Overview />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="deseos" element={<Wishlist />} />
            <Route path="preferencias" element={<Preferences />} />
            <Route path="configuracion" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Sales />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="stock" element={<Stock />} />
          <Route path="promos" element={<Promos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
