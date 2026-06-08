import { Link } from 'react-router-dom'

export default function CarCard({ car }) {
  if (!car) return null

  return (
    <Link
      to={`/cars/${car.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-full">
            {car.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {car.rating} ★
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900">
            {car.year} {car.make} {car.model}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          📍 {car.location} · {car.seats} seats · {car.transmission}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {car.features.slice(0, 3).map((f, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
              {f}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="text-xs text-gray-400">+{car.features.length - 3}</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-primary-600">${car.pricePerDay}</span>
            <span className="text-sm text-gray-500"> /day</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium text-gray-700">{car.host.name}</span>
            <span className="ml-1">· {car.reviewCount} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
