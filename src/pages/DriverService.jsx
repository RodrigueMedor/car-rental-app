import { useState } from 'react'
import { drivers, driverCategories } from '../data/mockData'

export default function DriverService() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [rentalOption, setRentalOption] = useState('vehicle-only')

  const filteredDrivers = selectedCategory === 'All'
    ? drivers
    : drivers.filter(driver => driver.categories.includes(selectedCategory))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚗</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Driver Included Service</h1>
          <p className="text-gray-600 text-lg">Rent with a professional chauffeur for a premium experience</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Rental Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setRentalOption('vehicle-only')}
              className={`p-6 rounded-xl border-2 transition-all ${
                rentalOption === 'vehicle-only'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl block mb-2">🔑</span>
                <p className="font-bold text-gray-900">Rent Vehicle Only</p>
                <p className="text-sm text-gray-600">Self-drive rental</p>
              </div>
            </button>
            <button
              onClick={() => setRentalOption('with-driver')}
              className={`p-6 rounded-xl border-2 transition-all ${
                rentalOption === 'with-driver'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl block mb-2">👨‍✈️</span>
                <p className="font-bold text-gray-900">Rent Vehicle + Driver</p>
                <p className="text-sm text-gray-600">Professional chauffeur included</p>
              </div>
            </button>
          </div>
        </div>

        {rentalOption === 'with-driver' && (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Services
              </button>
              {driverCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map(driver => (
                <div key={driver.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={driver.avatar} alt={driver.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <h3 className="font-bold text-gray-900">{driver.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-medium">{driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📅</span>
                        <span>{driver.yearsOfExperience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">🌐</span>
                        <span>{driver.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {driver.categories.slice(0, 2).map((cat, i) => (
                        <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{driver.bio}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">${driver.serviceFee}</span>
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${driver.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {driver.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedDriver(driver)}
                      disabled={!driver.available}
                      className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                        driver.available
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {driver.available ? 'Select Driver' : 'Not Available'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedDriver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Driver Details</h2>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img src={selectedDriver.avatar} alt={selectedDriver.name} className="w-20 h-20 rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedDriver.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{selectedDriver.rating}</span>
                      <span className="text-gray-500">• {selectedDriver.yearsOfExperience} years experience</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDriver.categories.map((cat, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDriver.specialties.map((spec, i) => (
                      <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDriver.languages.map((lang, i) => (
                      <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-800">Daily Service Fee</p>
                      <p className="text-3xl font-bold text-purple-900">${selectedDriver.serviceFee}</p>
                    </div>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                      Book Driver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
