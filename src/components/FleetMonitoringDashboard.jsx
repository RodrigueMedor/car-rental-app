import { useState } from 'react'
import VehicleMap from './VehicleMap'
import { vehicleLocations, geofences, vehicleStatuses } from '../data/vehicleTracking'

export default function FleetMonitoringDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [showGeofences, setShowGeofences] = useState(true)
  const [viewMode, setViewMode] = useState('map')

  const filteredVehicles = filterStatus === 'all'
    ? vehicleLocations
    : vehicleLocations.filter(v => v.status === filterStatus)

  const vehicleStatusColors = {
    available: 'bg-green-100 text-green-700',
    reserved: 'bg-yellow-100 text-yellow-700',
    in_use: 'bg-blue-100 text-blue-700',
    returned: 'bg-gray-100 text-gray-700',
    maintenance: 'bg-red-100 text-red-700',
  }

  const vehicleStatusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    in_use: 'In Use',
    returned: 'Returned',
    maintenance: 'Maintenance',
  }

  const statusCounts = vehicleStatuses.reduce((acc, status) => {
    acc[status] = vehicleLocations.filter(v => v.status === status).length
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fleet Monitoring Dashboard</h2>
            <p className="text-gray-600">Real-time vehicle tracking and monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGeofences(!showGeofences)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showGeofences
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {showGeofences ? '🔒 Geofences On' : '🔓 Geofences Off'}
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              {viewMode === 'map' ? '📋 List View' : '🗺️ Map View'}
            </button>
          </div>
        </div>

        {/* Status Counts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {vehicleStatuses.map(status => (
            <div
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? 'all' : status)}
              className={`bg-gray-50 rounded-xl p-4 cursor-pointer transition-colors ${
                filterStatus === status ? 'ring-2 ring-primary-500' : 'hover:bg-gray-100'
              }`}
            >
              <p className="text-xs text-gray-500 mb-1">{vehicleStatusLabels[status]}</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts[status] || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <VehicleMap
            vehicles={filteredVehicles}
            showGeofences={showGeofences}
            geofences={geofences}
            onVehicleClick={setSelectedVehicle}
          />
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map(vehicle => (
              <div
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🚗</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vehicle #{vehicle.carId}</p>
                      <p className="text-xs text-gray-500">Booking #{vehicle.bookingId || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${vehicleStatusColors[vehicle.status]}`}>
                    {vehicleStatusLabels[vehicle.status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Speed</p>
                    <p className="font-medium">{vehicle.speed} mph</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fuel</p>
                    <p className="font-medium">{vehicle.fuel}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Battery</p>
                    <p className="font-medium">{vehicle.battery}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Update</p>
                    <p className="font-medium">{new Date(vehicle.lastUpdate).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Vehicle #{selectedVehicle.carId}</h2>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
                    🚗
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Vehicle #{selectedVehicle.carId}</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${vehicleStatusColors[selectedVehicle.status]}`}>
                      {vehicleStatusLabels[selectedVehicle.status]}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Speed</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedVehicle.speed}</p>
                    <p className="text-xs text-gray-500">mph</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Fuel</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedVehicle.fuel}</p>
                    <p className="text-xs text-gray-500">%</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Battery</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedVehicle.battery}</p>
                    <p className="text-xs text-gray-500">%</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Heading</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedVehicle.heading}°</p>
                    <p className="text-xs text-gray-500">direction</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Location</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Latitude</p>
                      <p className="font-mono font-medium">{selectedVehicle.currentLocation.lat.toFixed(6)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Longitude</p>
                      <p className="font-mono font-medium">{selectedVehicle.currentLocation.lng.toFixed(6)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                    📍 View on Map
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors">
                    📊 View Trip History
                  </button>
                </div>

                {selectedVehicle.status === 'in_use' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors">
                      📞 Contact Driver
                    </button>
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-xl transition-colors">
                      🔒 Manage Geofence
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
