import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Therapies from './pages/Therapies'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Wellness from './pages/Wellness'
import Gallery from './pages/Gallery'
import Book from './pages/Book'
import Admin from './pages/Admin'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="therapies" element={<Therapies />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<Product />} />
        <Route path="wellness" element={<Wellness />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="book" element={<Book />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
