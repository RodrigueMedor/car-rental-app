import { useState } from 'react'
import { commercialVehicles, commercialCategories } from '../data/mockData'

export default function CommercialVehicles() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [rentalType, setRentalType] = useState('daily')

  const filteredVehicles = selectedCategory === 'All'
    ? commercialVehicles
    : commercialVehicles.filter(vehicle => vehicle.type === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚚</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Commercial Vehicle Rentals</h1>
          <p className="text-gray-600 text-lg">Cargo vans, box trucks, food trucks, and utility vehicles for your business</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Rental Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setRentalType('daily')}
              className={`p-4 rounded-xl border-2 transition-all ${
                rentalType === 'daily'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">📅</span>
                <p className="font-bold text-gray-900">Daily Rental</p>
                <p className="text-sm text-gray-600">Short-term needs</p>
              </div>
            </button>
            <button
              onClick={() => setRentalType('monthly')}
              className={`p-4 rounded-xl border-2 transition-all ${
                rentalType === 'monthly'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">📆</span>
                <p className="font-bold text-gray-900">Monthly Rental</p>
                <p className="text-sm text-gray-600">Long-term projects</p>
              </div>
            </button>
            <button
              onClick={() => setRentalType('fleet')}
              className={`p-4 rounded-xl border-2 transition-all ${
                rentalType === 'fleet'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">🏢</span>
                <p className="font-bold text-gray-900">Fleet Pricing</p>
                <p className="text-sm text-gray-600">Business accounts</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {commercialCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={vehicle.images[0]} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">
                    {vehicle.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{vehicle.type} • {vehicle.location}</p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cargo Capacity</span>
                    <span className="font-medium">{vehicle.cargoCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Rate</span>
                    <span className="font-medium">${vehicle.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Rate</span>
                    <span className="font-medium">${vehicle.monthlyRate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vehicle.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-semibold text-slate-900 mb-2">Business Features</p>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.commercialFeatures.businessAccount && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Business Account</span>
                    )}
                    {vehicle.commercialFeatures.longTermRental && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Long-Term</span>
                    )}
                    {vehicle.commercialFeatures.fleetPricing && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Fleet Pricing</span>
                    )}
                    {vehicle.commercialFeatures.invoiceGeneration && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Invoice</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedVehicle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h2>
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <img src={selectedVehicle.images[0]} alt="" className="w-full h-64 object-cover rounded-xl mb-6" />

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Vehicle Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Type</span><p className="font-medium">{selectedVehicle.type}</p></div>
                    <div><span className="text-gray-500">Category</span><p className="font-medium">{selectedVehicle.category}</p></div>
                    <div><span className="text-gray-500">Cargo Capacity</span><p className="font-medium">{selectedVehicle.cargoCapacity}</p></div>
                    <div><span className="text-gray-500">Seats</span><p className="font-medium">{selectedVehicle.seats}</p></div>
                    <div><span className="text-gray-500">Transmission</span><p className="font-medium">{selectedVehicle.transmission}</p></div>
                    <div><span className="text-gray-500">Fuel Type</span><p className="font-medium">{selectedVehicle.fuelType}</p></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Business Features</h3>
                  <div className="space-y-2">
                    {selectedVehicle.commercialFeatures.businessAccount && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">Business Account Support</span>
                      </div>
                    )}
                    {selectedVehicle.commercialFeatures.longTermRental && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">Long-Term Rental Options</span>
                      </div>
                    )}
                    {selectedVehicle.commercialFeatures.fleetPricing && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">Fleet Pricing Available</span>
                      </div>
                )}
                    {selectedVehicle.commercialFeatures.invoiceGeneration && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">Invoice Generation</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-800">Daily Rate</p>
                      <p className="text-2xl font-bold text-slate-900">${selectedVehicle.pricePerDay}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Monthly Rate</p>
                      <p className="text-2xl font-bold text-slate-700">${selectedVehicle.monthlyRate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors">
                    Book Now
                  </button>
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 rounded-xl transition-colors">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
