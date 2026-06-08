import { useState } from 'react'
import { airports } from '../data/mockData'

export default function AirportConcierge() {
  const [selectedAirport, setSelectedAirport] = useState(null)
  const [serviceType, setServiceType] = useState('pickup')
  const [flightNumber, setFlightNumber] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [meetAndGreet, setMeetAndGreet] = useState(false)
  const [luggageAssistance, setLuggageAssistance] = useState(false)
  const [childSeat, setChildSeat] = useState(false)

  const calculateTotal = () => {
    if (!selectedAirport) return 0
    let total = serviceType === 'pickup' ? selectedAirport.pickupFee : selectedAirport.deliveryFee
    if (meetAndGreet) total += selectedAirport.meetAndGreetFee
    if (luggageAssistance) total += selectedAirport.luggageAssistanceFee
    if (childSeat) total += selectedAirport.childSeatInstallationFee
    return total
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">✈️</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Airport Concierge Service</h1>
          <p className="text-gray-600 text-lg">Premium airport pickup and drop-off experience</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Airport</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {airports.map(airport => (
                <button
                  key={airport.id}
                  onClick={() => setSelectedAirport(airport)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedAirport?.id === airport.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛫</span>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{airport.code}</p>
                      <p className="text-sm text-gray-600">{airport.name}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedAirport && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Service Type</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setServiceType('pickup')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      serviceType === 'pickup'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl block mb-2">📥</span>
                      <p className="font-semibold text-gray-900">Airport Pickup</p>
                      <p className="text-sm text-gray-600">${selectedAirport.pickupFee}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setServiceType('dropoff')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      serviceType === 'dropoff'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl block mb-2">📤</span>
                      <p className="font-semibold text-gray-900">Airport Drop-off</p>
                      <p className="text-sm text-gray-600">${selectedAirport.deliveryFee}</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Flight Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="e.g., AA1234"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Service Add-ons</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🤝</span>
                      <div>
                        <p className="font-medium text-gray-900">Meet & Greet Service</p>
                        <p className="text-sm text-gray-600">Personal greeting at baggage claim</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">${selectedAirport.meetAndGreetFee}</span>
                      <input
                        type="checkbox"
                        checked={meetAndGreet}
                        onChange={(e) => setMeetAndGreet(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🧳</span>
                      <div>
                        <p className="font-medium text-gray-900">Luggage Assistance</p>
                        <p className="text-sm text-gray-600">Help with bags to vehicle</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">${selectedAirport.luggageAssistanceFee}</span>
                      <input
                        type="checkbox"
                        checked={luggageAssistance}
                        onChange={(e) => setLuggageAssistance(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">👶</span>
                      <div>
                        <p className="font-medium text-gray-900">Child Seat Installation</p>
                        <p className="text-sm text-gray-600">Safety-certified car seat installation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">${selectedAirport.childSeatInstallationFee}</span>
                      <input
                        type="checkbox"
                        checked={childSeat}
                        onChange={(e) => setChildSeat(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedAirport.code} {serviceType === 'pickup' ? 'Pickup' : 'Drop-off'}</span>
                    <span className="font-medium">${serviceType === 'pickup' ? selectedAirport.pickupFee : selectedAirport.deliveryFee}</span>
                  </div>
                  {meetAndGreet && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Meet & Greet</span>
                      <span className="font-medium">${selectedAirport.meetAndGreetFee}</span>
                    </div>
                  )}
                  {luggageAssistance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Luggage Assistance</span>
                      <span className="font-medium">${selectedAirport.luggageAssistanceFee}</span>
                    </div>
                  )}
                  {childSeat && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Child Seat Installation</span>
                      <span className="font-medium">${selectedAirport.childSeatInstallationFee}</span>
                    </div>
                  )}
                  <div className="border-t border-green-200 pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-green-700 text-xl">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                Book Airport Concierge Service
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
