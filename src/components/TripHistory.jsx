import { useState } from 'react'
import { tripHistory } from '../data/vehicleTracking'

export default function TripHistory({ vehicleId }) {
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [showRouteMap, setShowRouteMap] = useState(false)

  const filteredTrips = vehicleId
    ? tripHistory.filter(trip => trip.carId === vehicleId)
    : tripHistory

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Trip History</h3>
        
        {filteredTrips.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No trip history available</p>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map(trip => (
              <div
                key={trip.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Trip #{trip.id}</p>
                      <p className="text-sm text-gray-500">Vehicle #{trip.carId}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Start Time</p>
                    <p className="font-medium">{new Date(trip.startTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">End Time</p>
                    <p className="font-medium">{new Date(trip.endTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Distance</p>
                    <p className="font-medium">{trip.distance} mi</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">
                      {Math.round((new Date(trip.endTime) - new Date(trip.startTime)) / (1000 * 60 * 60))}h
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTrip(trip)
                      setShowRouteMap(true)
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    View Route
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Trip Details #{selectedTrip.id}</h2>
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedTrip.distance}</p>
                  <p className="text-xs text-gray-500">miles</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Max Speed</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedTrip.maxSpeed}</p>
                  <p className="text-xs text-gray-500">mph</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Avg Speed</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedTrip.avgSpeed}</p>
                  <p className="text-xs text-gray-500">mph</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Stops</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedTrip.stops}</p>
                  <p className="text-xs text-gray-500">count</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Route Timeline</h3>
                <div className="space-y-3">
                  {selectedTrip.route.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{new Date(point.timestamp).toLocaleString()}</p>
                        <p className="font-mono text-sm text-gray-700">
                          {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                  📊 View Analytics
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors">
                  📥 Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRouteMap && selectedTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Route Map - Trip #{selectedTrip.id}</h2>
                <button
                  onClick={() => setShowRouteMap(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden">
                {/* Simulated Route Map */}
                <svg className="w-full h-full" viewBox="0 0 800 400">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Route Path */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    points={selectedTrip.route.map((p, i) => `${p.lat * 10},${p.lng * -5 + 50}`).join(' ')}
                  />

                  {/* Route Points */}
                  {selectedTrip.route.map((point, index) => {
                    const x = point.lat * 10
                    const y = point.lng * -5 + 50
                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r={index === 0 ? 8 : index === selectedTrip.route.length - 1 ? 8 : 5}
                          fill={index === 0 ? '#22c55e' : index === selectedTrip.route.length - 1 ? '#ef4444' : '#3b82f6'}
                          stroke="white"
                          strokeWidth="2"
                        />
                        {index === 0 && (
                          <text x={x + 15} y={y + 5} className="text-xs fill-gray-700">Start</text>
                        )}
                        {index === selectedTrip.route.length - 1 && (
                          <text x={x + 15} y={y + 5} className="text-xs fill-gray-700">End</text>
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-green-700 font-medium">🟢 Start Point</p>
                  <p className="text-green-600 font-mono text-xs">
                    {selectedTrip.route[0].lat.toFixed(6)}, {selectedTrip.route[0].lng.toFixed(6)}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-red-700 font-medium">🔴 End Point</p>
                  <p className="text-red-600 font-mono text-xs">
                    {selectedTrip.route[selectedTrip.route.length - 1].lat.toFixed(6)}, {selectedTrip.route[selectedTrip.route.length - 1].lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
