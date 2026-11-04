import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './sections/Home'
import Research from './sections/Research'
import About from './sections/About'
import Competitions from './sections/Competitions'

// The reading page pulls in the Markdown parser and KaTeX, so it is loaded
// on demand rather than bundled into every page.
const PaperDetail = lazy(() => import('./sections/PaperDetail'))

// Start at the top whenever the address changes (including ?page= changes)
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return null
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
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:slug" element={<PaperDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
