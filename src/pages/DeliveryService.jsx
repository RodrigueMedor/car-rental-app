import { useState } from 'react'
import { deliveryLocations } from '../data/mockData'

export default function DeliveryService() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [address, setAddress] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const calculateDeliveryFee = () => {
    if (!selectedLocation) return 0
    return selectedLocation.baseFee
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚚</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Delivery Anywhere Service</h1>
          <p className="text-gray-600 text-lg">Get your vehicle delivered to any location</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Delivery Location Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {deliveryLocations.map(location => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedLocation?.id === location.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl block mb-2">
                      {location.type === 'residential' ? '🏠' :
                       location.type === 'hotel' ? '🏨' :
                       location.type === 'resort' ? '🏰' :
                       location.type === 'port' ? '🚢' :
                       location.type === 'commercial' ? '🏢' : '📍'}
                    </span>
                    <p className="font-medium text-gray-900 text-sm">{location.name}</p>
                    <p className="text-xs text-gray-500">${location.baseFee}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedLocation && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter full address"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                      <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Gate code, building instructions, etc."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location Type</span>
                    <span className="font-medium">{selectedLocation.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Delivery Fee</span>
                    <span className="font-medium">${selectedLocation.baseFee}</span>
                  </div>
                  <div className="border-t border-orange-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Delivery Fee</span>
                    <span className="font-bold text-orange-700 text-xl">${calculateDeliveryFee()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Delivery Information</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Delivery typically takes 2-4 hours</li>
                      <li>• Driver will call upon arrival</li>
                      <li>• Photo verification required</li>
                      <li>• Free cancellation up to 24 hours before</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                Schedule Delivery
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
