import { useState } from 'react'
import { mechanics, mechanicServices } from '../data/mockData'

export default function MechanicMarketplace() {
  const [selectedService, setSelectedService] = useState('All')
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')

  const filteredMechanics = selectedService === 'All'
    ? mechanics
    : mechanics.filter(mechanic => mechanic.services.includes(selectedService))

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🔧</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Local Mechanic Marketplace</h1>
          <p className="text-gray-600 text-lg">Find trusted mechanics for vehicle maintenance and repairs</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedService('All')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedService === 'All'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Services
          </button>
          {mechanicServices.map(service => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.name)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedService === service.name
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMechanics.map(mechanic => (
            <div key={mechanic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={mechanic.avatar} alt={mechanic.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="font-bold text-gray-900">{mechanic.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{mechanic.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📍</span>
                    <span>{mechanic.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📞</span>
                    <span>{mechanic.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mechanic.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Hourly Rate</span>
                    <p className="text-xl font-bold text-primary-600">${mechanic.hourlyRate}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${mechanic.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mechanic.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedMechanic(mechanic)}
                  disabled={!mechanic.available}
                  className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                    mechanic.available
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {mechanic.available ? 'View Details' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedMechanic && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMechanic.name}</h2>
                  <button
                    onClick={() => setSelectedMechanic(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img src={selectedMechanic.avatar} alt="" className="w-20 h-20 rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedMechanic.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{selectedMechanic.rating}</span>
                      <span className="text-gray-500">• {selectedMechanic.yearsExperience} years experience</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMechanic.services.map((service, i) => (
                      <span key={i} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Service Pricing</h3>
                  <div className="space-y-2 text-sm">
                    {selectedMechanic.services.map((service, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-700">{service}</span>
                        <span className="font-medium">${selectedMechanic.hourlyRate}/hr</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-800">Hourly Rate</p>
                      <p className="text-3xl font-bold text-amber-900">${selectedMechanic.hourlyRate}</p>
                    </div>
                    <button
                      onClick={() => setShowBooking(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBooking && selectedMechanic && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mechanic</label>
                    <p className="text-gray-900 font-medium">{selectedMechanic.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                      {selectedMechanic.services.map((service, i) => (
                        <option key={i}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors">
                    Confirm Booking
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
