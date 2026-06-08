import { useState } from 'react'
import { serviceProviders, issueTypes } from '../data/mockData'

export default function RoadsideAssistanceMarketplace() {
  const [selectedService, setSelectedService] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingIssue, setBookingIssue] = useState('')
  const [bookingLocation, setBookingLocation] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')

  const filteredProviders = selectedService === 'All'
    ? serviceProviders
    : serviceProviders.filter(provider => provider.services.includes(selectedService))

  const issueTypeLabels = {
    flat_tire: 'Flat Tire',
    dead_battery: 'Dead Battery',
    lockout: 'Lockout',
    fuel_delivery: 'Fuel Delivery',
    tow: 'Towing',
    mechanical: 'Mechanical Issue',
    accident: 'Accident',
    other: 'Other'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚨</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Roadside Assistance Marketplace</h1>
          <p className="text-gray-600 text-lg">Find trusted roadside assistance providers in your area</p>
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
          {issueTypes.map(issue => (
            <button
              key={issue}
              onClick={() => setSelectedService(issue)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedService === issue
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {issueTypeLabels[issue] || issue}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <div key={provider.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={provider.image} alt={provider.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${provider.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {provider.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{provider.location}</p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📞</span>
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">⏱️</span>
                    <span>{provider.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-primary-600">${provider.hourlyRate}</span>
                    <span className="text-sm text-gray-500">/hr</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {provider.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {issueTypeLabels[service] || service}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProvider(provider)}
                  disabled={!provider.available}
                  className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                    provider.available
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {provider.available ? 'Request Assistance' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProvider && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.name}</h2>
                  <button
                    onClick={() => setSelectedProvider(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <img src={selectedProvider.image} alt="" className="w-full h-64 object-cover rounded-xl mb-6" />

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Provider Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Location</span><p className="font-medium">{selectedProvider.location}</p></div>
                    <div><span className="text-gray-500">Phone</span><p className="font-medium">{selectedProvider.phone}</p></div>
                    <div><span className="text-gray-500">Response Time</span><p className="font-medium">{selectedProvider.responseTime}</p></div>
                    <div><span className="text-gray-500">Hourly Rate</span><p className="font-medium">${selectedProvider.hourlyRate}</p></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.services.map((service, i) => (
                      <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        {issueTypeLabels[service] || service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-800">Rating</p>
                      <p className="text-3xl font-bold text-red-900">{selectedProvider.rating}⭐</p>
                      <p className="text-sm text-red-600">{selectedProvider.reviewCount} reviews</p>
                    </div>
                    <button
                      onClick={() => setShowBooking(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                      Request Assistance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBooking && selectedProvider && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Request Assistance</h2>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <p className="text-gray-900 font-medium">{selectedProvider.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                    <select
                      value={bookingIssue}
                      onChange={(e) => setBookingIssue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    >
                      <option value="">Select issue type</option>
                      {issueTypes.map(issue => (
                        <option key={issue} value={issue}>{issueTypeLabels[issue] || issue}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={bookingLocation}
                      onChange={(e) => setBookingLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors">
                    Submit Request
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
