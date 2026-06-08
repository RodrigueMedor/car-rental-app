import ServiceCard from '../components/ServiceCard'
import { services } from '../data/mockData'

export default function Services() {
  const categories = [
    { title: 'Travel Add-ons', services: services.filter((s) => [1, 3, 4, 5].includes(s.id)) },
    { title: 'Family & Comfort', services: services.filter((s) => [2].includes(s.id)) },
    { title: 'Long-term Options', services: services.filter((s) => [6, 7, 8].includes(s.id)) },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Extra Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Make your rental experience seamless with our premium add-on services.
            From airport pickup to full vacation concierge support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{cat.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
