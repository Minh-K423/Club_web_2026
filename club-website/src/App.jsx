import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { paperRoute, siteLinks } from './navigation'
import About from './pages/About'
import Competitions from './pages/Competitions'
import Home from './pages/Home'
import Research from './pages/Research'

// Load the Markdown parser and KaTeX when a visitor opens a paper.
const PaperDetail = lazy(() => import('./pages/PaperDetail'))

// Start at the top whenever the address changes (including ?page= changes)
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return null
}

function ReadyRoute() {
  // This effect commits with the requested page, after any suspended paper has loaded.
  useEffect(() => {
    window.dispatchEvent(new Event('club:route-ready'))
  }, [])
  return <Outlet />
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl px-4 py-24 text-center text-gray-500">
              Loading paper…
            </div>
          }
        >
          <Routes>
            <Route element={<ReadyRoute />}>
              <Route path={siteLinks.home.to} element={<Home />} />
              <Route path={siteLinks.research.to} element={<Research />} />
              <Route path={paperRoute} element={<PaperDetail />} />
              <Route path={siteLinks.about.to} element={<About />} />
              <Route path={siteLinks.competitions.to} element={<Competitions />} />
            </Route>
            <Route path="*" element={<Navigate to={siteLinks.home.to} replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
