import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vacationPackages, packageTypes } from '../data/mockData'

export default function VacationPackages() {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedPackage, setSelectedPackage] = useState(null)

  const filteredPackages = selectedType === 'All' 
    ? vacationPackages 
    : vacationPackages.filter(pkg => pkg.type === selectedType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🌴</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vacation Packages</h1>
          <p className="text-gray-600 text-lg">Complete travel experiences with vehicle, hotel, and attractions</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {packageTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedType === type 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                {pkg.popular && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {pkg.duration} Days
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{pkg.type} Package</p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🚗</span>
                    <span>{pkg.includes.vehicle.type} - {pkg.includes.vehicle.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🏨</span>
                    <span>{pkg.includes.hotel.name} ({pkg.includes.hotel.nights} nights)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🎫</span>
                    <span>{pkg.includes.tickets.name}</span>
                  </div>
                  {pkg.includes.airportConcierge && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">✈️</span>
                      <span>Airport Concierge Included</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {pkg.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">${pkg.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    Save ${pkg.originalPrice - pkg.price}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img src={selectedPackage.image} alt={selectedPackage.name} className="w-full h-64 object-cover" />
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPackage.name}</h2>
                <p className="text-gray-600 mb-6">{selectedPackage.duration}-day {selectedPackage.type} experience</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Package Includes</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🚗</span>
                      <div>
                        <p className="font-medium">{selectedPackage.includes.vehicle.type}</p>
                        <p className="text-sm text-gray-600">{selectedPackage.includes.vehicle.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🏨</span>
                      <div>
                        <p className="font-medium">{selectedPackage.includes.hotel.name}</p>
                        <p className="text-sm text-gray-600">{selectedPackage.includes.hotel.nights} nights • ⭐ {selectedPackage.includes.hotel.rating}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎫</span>
                      <div>
                        <p className="font-medium">{selectedPackage.includes.tickets.name}</p>
                        <p className="text-sm text-gray-600">{selectedPackage.includes.tickets.days} days • {selectedPackage.includes.tickets.people} people</p>
                      </div>
                    </div>
                    {selectedPackage.includes.airportConcierge && (
                      <div className="flex items-start gap-3">
                        <span className="text-xl">✈️</span>
                        <div>
                          <p className="font-medium">Airport Concierge</p>
                          <p className="text-sm text-gray-600">Meet & greet service included</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.features.map((feature, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl mb-6">
                  <div>
                    <p className="text-sm text-green-800">Total Price</p>
                    <p className="text-3xl font-bold text-green-800">${selectedPackage.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 line-through">${selectedPackage.originalPrice}</p>
                    <p className="text-sm font-medium text-green-700">Save ${selectedPackage.originalPrice - selectedPackage.price}</p>
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                  Book This Package
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
