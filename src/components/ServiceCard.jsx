import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  if (!service) return null

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-1">{service.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {service.price > 0 ? (
          <span className="text-xl font-bold text-primary-600">${service.price}</span>
        ) : (
          <span className="text-sm font-medium text-green-600">✓ Included</span>
        )}
        <Link to="/services" className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
          Learn more →
        </Link>
      </div>
    </div>
  )
}
