import { useState, useEffect } from 'react'
import VehicleMap from './VehicleMap'
import { vehicleLocations } from '../data/vehicleTracking'

export default function LiveVehicleTracker({ vehicleId, showGeofences = false }) {
  const [vehicle, setVehicle] = useState(null)
  const [isLive, setIsLive] = useState(true)
  const [updateInterval, setUpdateInterval] = useState(5000)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (vehicleId) {
      const foundVehicle = vehicleLocations.find(v => v.carId === vehicleId)
      setVehicle(foundVehicle)
    } else {
      setVehicle(vehicleLocations[0])
    }
  }, [vehicleId])

  useEffect(() => {
    if (!isLive || !vehicle) return

    const interval = setInterval(() => {
      // Simulate real-time GPS updates
      setVehicle(prev => {
        if (!prev) return prev
        const latChange = (Math.random() - 0.5) * 0.001
        const lngChange = (Math.random() - 0.5) * 0.001
        const speedChange = Math.floor((Math.random() - 0.5) * 10)
        
        return {
          ...prev,
          currentLocation: {
            lat: prev.currentLocation.lat + latChange,
            lng: prev.currentLocation.lng + lngChange,
          },
          speed: Math.max(0, Math.min(80, prev.speed + speedChange)),
          lastUpdate: new Date().toISOString(),
        }
      })
      setLastUpdate(new Date())
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isLive, updateInterval, vehicle])

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

  if (!vehicle) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-600">Loading vehicle data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
              🚗
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Vehicle #{vehicle.carId}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${vehicleStatusColors[vehicle.status]}`}>
                {vehicleStatusLabels[vehicle.status]}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isLive
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isLive ? '🔴 Live' : '⏸️ Paused'}
            </button>
            <select
              value={updateInterval}
              onChange={(e) => setUpdateInterval(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="2000">2s</option>
              <option value="5000">5s</option>
              <option value="10000">10s</option>
              <option value="30000">30s</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Speed</p>
            <p className="text-2xl font-bold text-gray-900">{vehicle.speed}</p>
            <p className="text-xs text-gray-500">mph</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Fuel</p>
            <p className="text-2xl font-bold text-gray-900">{vehicle.fuel}</p>
            <p className="text-xs text-gray-500">%</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Battery</p>
            <p className="text-2xl font-bold text-gray-900">{vehicle.battery}</p>
            <p className="text-xs text-gray-500">%</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Heading</p>
            <p className="text-2xl font-bold text-gray-900">{vehicle.heading}°</p>
            <p className="text-xs text-gray-500">direction</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Map */}
      <VehicleMap vehicles={[vehicle]} showGeofences={showGeofences} />

      {/* Location Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Current Location</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Latitude</p>
            <p className="font-mono font-medium">{vehicle.currentLocation.lat.toFixed(6)}</p>
          </div>
          <div>
            <p className="text-gray-500">Longitude</p>
            <p className="font-mono font-medium">{vehicle.currentLocation.lng.toFixed(6)}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
            📍 Get Directions
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors">
            📞 Contact Driver
          </button>
        </div>
      </div>
    </div>
  )
}
