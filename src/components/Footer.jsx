import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌴</span>
              <span className="text-lg font-bold text-white">Sunshine Wheels</span>
            </div>
            <p className="text-sm text-gray-400">
              Florida's premier peer-to-peer car rental platform. Hit the road your way.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="hover:text-white transition-colors">Browse Cars</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Extra Services</Link></li>
              <li><Link to="/host" className="hover:text-white transition-colors">Become a Host</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Safety</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Cancellation Policy</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 (305) 555-WHEEL</li>
              <li>✉️ hello@sunshinewheels.com</li>
              <li>📍 Miami Beach, FL 33139</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sunshine Wheels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
