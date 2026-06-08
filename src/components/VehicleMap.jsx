import { useState, useEffect } from 'react'

export default function VehicleMap({ vehicles, center, zoom = 12, onVehicleClick, showGeofences = false, geofences = [] }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const vehicleStatusColors = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    in_use: 'bg-blue-500',
    returned: 'bg-gray-500',
    maintenance: 'bg-red-500',
  }

  const vehicleStatusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    in_use: 'In Use',
    returned: 'Returned',
    maintenance: 'Maintenance',
  }

  if (!mapLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 800 400">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated roads */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="#6b7280" strokeWidth="2" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#6b7280" strokeWidth="2" />
          <line x1="100" y1="0" x2="100" y2="400" stroke="#9ca3af" strokeWidth="1" />
          <line x1="700" y1="0" x2="700" y2="400" stroke="#9ca3af" strokeWidth="1" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="#9ca3af" strokeWidth="1" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="#9ca3af" strokeWidth="1" />
        </svg>
      </div>

      {/* Geofence Circles */}
      {showGeofences && geofences.map(geofence => (
        <div
          key={geofence.id}
          className="absolute rounded-full border-2 border-dashed border-orange-400 bg-orange-100/20"
          style={{
            left: `${geofence.center.lat * 10}%`,
            top: `${geofence.center.lng * -5 + 50}%`,
            width: `${geofence.radius / 1000}px`,
            height: `${geofence.radius / 1000}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Vehicle Markers */}
      {vehicles.map(vehicle => {
        const x = vehicle.currentLocation.lat * 10
        const y = vehicle.currentLocation.lng * -5 + 50
        return (
          <div
            key={vehicle.id}
            onClick={() => {
              setSelectedVehicle(vehicle)
              if (onVehicleClick) onVehicleClick(vehicle)
            }}
            className="absolute cursor-pointer transform hover:scale-110 transition-transform"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div className={`w-8 h-8 rounded-full ${vehicleStatusColors[vehicle.status]} border-2 border-white shadow-lg flex items-center justify-center`}>
                <span className="text-white text-xs">🚗</span>
              </div>
              {vehicle.speed > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        )
      })}

      {/* Selected Vehicle Popup */}
      {selectedVehicle && (
        <div
          className="absolute bg-white rounded-xl shadow-xl p-4 z-10 min-w-64"
          style={{
            left: `${selectedVehicle.currentLocation.lat * 10}%`,
            top: `${selectedVehicle.currentLocation.lng * -5 + 50 - 15}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <button
            onClick={() => setSelectedVehicle(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full ${vehicleStatusColors[selectedVehicle.status]} flex items-center justify-center`}>
              <span className="text-white">🚗</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">Vehicle #{selectedVehicle.carId}</p>
              <p className="text-sm text-gray-600">{vehicleStatusLabels[selectedVehicle.status]}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Speed</span>
              <span className="font-medium">{selectedVehicle.speed} mph</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fuel</span>
              <span className="font-medium">{selectedVehicle.fuel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Battery</span>
              <span className="font-medium">{selectedVehicle.battery}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Update</span>
              <span className="font-medium">{new Date(selectedVehicle.lastUpdate).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">−</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">🎯</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">Vehicle Status</p>
        <div className="space-y-1">
          {Object.entries(vehicleStatusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded-full ${vehicleStatusColors[status]}`} />
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
