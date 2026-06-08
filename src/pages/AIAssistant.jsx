import { useState } from 'react'
import { cars } from '../data/mockData'

export default function AIAssistant() {
  const [preferences, setPreferences] = useState({
    budget: '',
    passengers: '',
    luggage: '',
    tripType: '',
    destination: '',
    startDate: '',
    endDate: '',
  })
  const [recommendations, setRecommendations] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const getRecommendations = () => {
    let filtered = [...cars]

    if (preferences.budget) {
      filtered = filtered.filter(c => c.pricePerDay <= parseInt(preferences.budget))
    }

    if (preferences.passengers) {
      filtered = filtered.filter(c => c.seats >= parseInt(preferences.passengers))
    }

    if (preferences.luggage) {
      const luggageCount = parseInt(preferences.luggage)
      if (luggageCount > 2) {
        filtered = filtered.filter(c => c.type === 'SUV' || c.type === 'Minivan' || c.type === 'Cargo Van' || c.type === 'Moving Truck')
      }
    }

    if (preferences.tripType) {
      if (preferences.tripType === 'disney') {
        filtered = filtered.filter(c => c.seats >= 5 || c.type === 'Minivan' || c.type === 'SUV')
      } else if (preferences.tripType === 'universal') {
        filtered = filtered.filter(c => c.seats >= 4)
      } else if (preferences.tripType === 'beach') {
        filtered = filtered.filter(c => c.type === 'Convertible' || c.type === 'SUV')
      } else if (preferences.tripType === 'family') {
        filtered = filtered.filter(c => c.seats >= 5 || c.type === 'Minivan' || c.type === 'SUV')
      } else if (preferences.tripType === 'adventure') {
        filtered = filtered.filter(c => c.type === 'SUV' || c.type === 'Pickup Truck' || c.type === 'Truck')
      } else if (preferences.tripType === 'business') {
        filtered = filtered.filter(c => c.type === 'Luxury' || c.type === 'Sedan' || c.pricePerDay > 100)
      } else if (preferences.tripType === 'luxury') {
        filtered = filtered.filter(c => c.type === 'Luxury' || c.pricePerDay > 200)
      } else if (preferences.tripType === 'economy') {
        filtered = filtered.filter(c => c.pricePerDay < 100)
      }
    }

    if (preferences.destination) {
      const dest = preferences.destination.toLowerCase()
      if (dest.includes('disney')) {
        filtered = filtered.filter(c => c.location.toLowerCase().includes('orlando') || c.location.toLowerCase().includes('kissimmee'))
      } else if (dest.includes('universal')) {
        filtered = filtered.filter(c => c.location.toLowerCase().includes('orlando'))
      } else if (dest.includes('beach') || dest.includes('miami') || dest.includes('fort lauderdale')) {
        filtered = filtered.filter(c => c.location.toLowerCase().includes('miami') || c.location.toLowerCase().includes('fort lauderdale') || c.location.toLowerCase().includes('miami beach'))
      } else {
        filtered = filtered.filter(c => c.location.toLowerCase().includes(dest))
      }
    }

    setRecommendations(filtered.slice(0, 6))
    setShowResults(true)
  }

  const calculateTotalCost = (pricePerDay) => {
    if (!preferences.startDate || !preferences.endDate) return pricePerDay
    const start = new Date(preferences.startDate)
    const end = new Date(preferences.endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return days > 0 ? pricePerDay * days : pricePerDay
  }

  const getDuration = () => {
    if (!preferences.startDate || !preferences.endDate) return 0
    const start = new Date(preferences.startDate)
    const end = new Date(preferences.endDate)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🤖</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Travel Assistant</h1>
          <p className="text-gray-600 text-lg">Get personalized vehicle recommendations and cost estimates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🎯</span> Your Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={preferences.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <select
                    name="passengers"
                    value={preferences.passengers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="2">1-2</option>
                    <option value="4">3-4</option>
                    <option value="5">5-6</option>
                    <option value="7">7+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Luggage Count</label>
                  <select
                    name="luggage"
                    value={preferences.luggage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="1">1-2 bags</option>
                    <option value="3">3-4 bags</option>
                    <option value="5">5+ bags</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                  <select
                    name="tripType"
                    value={preferences.tripType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="disney">🏰 Disney Trip</option>
                    <option value="universal">🎢 Universal Trip</option>
                    <option value="beach">🏖️ Beach Vacation</option>
                    <option value="family">👨‍👩‍👧‍👦 Family Trip</option>
                    <option value="adventure">🏔️ Adventure</option>
                    <option value="business">💼 Business</option>
                    <option value="luxury">✨ Luxury</option>
                    <option value="economy">💰 Economy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={preferences.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Disney World, Miami Beach"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={preferences.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={preferences.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  onClick={getRecommendations}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!showResults ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
                <span className="text-6xl block mb-4">🚗</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Find Your Perfect Ride</h3>
                <p className="text-gray-600">Fill in your preferences on the left and click "Get Recommendations" to see personalized vehicle suggestions.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>✨</span> AI Recommendations
                  </h2>
                  {recommendations.length === 0 ? (
                    <p className="text-gray-600">No vehicles match your criteria. Try adjusting your preferences.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map(car => (
                        <div key={car.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <img src={car.images[0]} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
                          <h4 className="font-bold text-gray-900">{car.year} {car.make} {car.model}</h4>
                          <p className="text-sm text-gray-600 mb-2">{car.type} • {car.seats} seats • {car.transmission}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-bold text-indigo-600">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
                              {preferences.startDate && preferences.endDate && (
                                <p className="text-xs text-gray-500">Total: ${calculateTotalCost(car.pricePerDay)}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm font-medium">{car.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {showResults && recommendations.length > 0 && (
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span>💡</span> AI Insights
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Found {recommendations.length} vehicles matching your criteria</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Trip duration: {getDuration()} days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Average daily rate: ${Math.round(recommendations.reduce((sum, c) => sum + c.pricePerDay, 0) / recommendations.length)}</span>
                      </li>
                      {getDuration() > 0 && (
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Estimated total cost: ${Math.round(recommendations.reduce((sum, c) => sum + calculateTotalCost(c.pricePerDay), 0) / recommendations.length * getDuration())}</span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Best rated: {recommendations.sort((a, b) => b.rating - a.rating)[0]?.make} {recommendations.sort((a, b) => b.rating - a.rating)[0]?.model} ({recommendations.sort((a, b) => b.rating - a.rating)[0]?.rating}⭐)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Most affordable: {recommendations.sort((a, b) => a.pricePerDay - b.pricePerDay)[0]?.make} {recommendations.sort((a, b) => a.pricePerDay - b.pricePerDay)[0]?.model} (${recommendations.sort((a, b) => a.pricePerDay - b.pricePerDay)[0]?.pricePerDay}/day)</span>
                      </li>
                      {preferences.tripType === 'disney' && (
                        <li className="flex items-start gap-2">
                          <span>🎢</span>
                          <span>Tip: Consider adding airport concierge service for Disney trips</span>
                        </li>
                      )}
                      {preferences.tripType === 'beach' && (
                        <li className="flex items-start gap-2">
                          <span>🏖️</span>
                          <span>Tip: Convertibles are perfect for beach destinations</span>
                        </li>
                      )}
                      {preferences.tripType === 'family' && (
                        <li className="flex items-start gap-2">
                          <span>👨‍👩‍👧‍👦</span>
                          <span>Tip: Minivans and SUVs offer best space for families</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
