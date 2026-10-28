import Gallery from './components/Gallery.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="page-glow pointer-events-none absolute inset-x-0 top-0 h-72" aria-hidden="true" />
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Gallery />
      </main>
    </div>
  )
}
