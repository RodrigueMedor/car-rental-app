import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl block mb-4">🌴</span>
        <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-2">Page not found</p>
        <p className="text-gray-500 mb-8">Looks like you took a wrong turn. This page doesn't exist.</p>
        <Link
          to="/"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
