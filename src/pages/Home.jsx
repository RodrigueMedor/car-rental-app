import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import CarCard from '../components/CarCard'
import ServiceCard from '../components/ServiceCard'
import { cars, services } from '../data/mockData'

const features = [
  { icon: '🔑', title: 'Book Instantly', desc: 'Reserve your perfect car in under 60 seconds.' },
  { icon: '🤝', title: 'Peer-to-Peer', desc: 'Rent from trusted local hosts across Florida.' },
  { icon: '🛡️', title: 'Insurance Included', desc: 'Every booking comes with comprehensive coverage.' },
  { icon: '💬', title: '24/7 Support', desc: 'Multilingual support team always ready to help.' },
]

export default function Home() {
  const featuredCars = useMemo(() => cars.filter((c) => c.rating >= 4.8).slice(0, 4), [])

  return (
    <div>
      <section className="relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
              Your Adventure
              <span className="block text-sun-400">Starts Here</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Rent the perfect car from local hosts. Add services like airport delivery, GPS, and vacation concierge.
            </p>
          </div>
          <SearchBar />
          <div className="flex justify-center gap-6 mt-8 text-sm text-blue-200">
            <span>🚗 300+ cars</span>
            <span>📍 Multiple cities</span>
            <span>⭐ 4.7 avg rating</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
              <p className="text-gray-500 mt-1">Top-rated vehicles from trusted hosts</p>
            </div>
            <Link to="/cars" className="text-primary-600 font-semibold hover:text-primary-800 hidden sm:block">
              View all cars →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/cars" className="inline-block bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Extra Services</h2>
          <p className="text-gray-500 mb-8">Make your trip seamless with our add-on services</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="text-primary-600 font-semibold hover:text-primary-800">
              See all services →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-sun-500 to-sun-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Host</h2>
          <p className="text-lg text-sun-100 mb-8 max-w-2xl mx-auto">
            List your car and earn extra income. Set your own schedule and prices. Join hundreds of hosts across Florida.
          </p>
          <Link
            to="/host"
            className="inline-block bg-white text-sun-600 font-bold px-8 py-4 rounded-xl hover:bg-sun-50 transition-colors text-lg shadow-lg"
          >
            Start Earning Today
          </Link>
        </div>
      </section>
    </div>
  )
}
