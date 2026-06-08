import { useState, useMemo } from 'react'
import LiveVehicleTracker from '../components/LiveVehicleTracker'
import TripHistory from '../components/TripHistory'
import GeofenceManagement from '../components/GeofenceManagement'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/users'
import { vehicleLocations, bookings, cars } from '../data/mockData'

export default function VehicleTracking() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('live')
  const [selectedVehicleId, setSelectedVehicleId] = useState(1)

  const tabs = [
    { id: 'live', label: 'Live Tracking', icon: '🔴' },
    { id: 'history', label: 'Trip History', icon: '📊' },
    { id: 'geofence', label: 'Geofence', icon: '🔒' },
  ]

  // Role-based vehicle filtering
  const accessibleVehicles = useMemo(() => {
    if (!currentUser) return vehicleLocations

    switch (currentUser.role) {
      case ROLES.CUSTOMER:
        // Customers can only see vehicles they have rented
        const userBookings = bookings.filter(b => b.userId === currentUser.id)
        const rentedCarIds = userBookings.map(b => b.carId)
        return vehicleLocations.filter(v => rentedCarIds.includes(v.carId))
      
      case ROLES.HOST:
        // Hosts can only see their own vehicles
        const hostCars = cars.filter(c => c.hostId === currentUser.id)
        const hostCarIds = hostCars.map(c => c.id)
        return vehicleLocations.filter(v => hostCarIds.includes(v.carId))
      
      case ROLES.FLEET_OWNER:
        // Fleet owners can see all fleet vehicles (first 8 cars in this demo)
        const fleetCars = cars.slice(0, 8)
        const fleetCarIds = fleetCars.map(c => c.id)
        return vehicleLocations.filter(v => fleetCarIds.includes(v.carId))
      
      case ROLES.SUPER_ADMIN:
        // Super admins can see all vehicles
        return vehicleLocations
      
      default:
        return []
    }
  }, [currentUser])

  const availableVehicleOptions = useMemo(() => {
    return accessibleVehicles.map(v => ({
      id: v.carId,
      label: `Vehicle #${v.carId}`,
      details: cars.find(c => c.id === v.carId)?.make && cars.find(c => c.id === v.carId)?.model
        ? `${cars.find(c => c.id === v.carId).year} ${cars.find(c => c.id === v.carId).make} ${cars.find(c => c.id === v.carId).model}`
        : 'Vehicle'
    }))
  }, [accessibleVehicles])

  // Set default vehicle to first accessible vehicle if current selection is not accessible
  useState(() => {
    if (accessibleVehicles.length > 0 && !accessibleVehicles.find(v => v.carId === selectedVehicleId)) {
      setSelectedVehicleId(accessibleVehicles[0].carId)
    }
  })

  if (accessibleVehicles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="text-5xl block mb-4">🔒</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 text-lg">You don't have any vehicles available for tracking.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">📍</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vehicle Tracking</h1>
          <p className="text-gray-600 text-lg">Track your rental vehicle in real-time</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                🚗
              </div>
              <div>
                <p className="font-bold text-gray-900">Vehicle #{selectedVehicleId}</p>
                <p className="text-sm text-gray-500">
                  {availableVehicleOptions.find(v => v.id === selectedVehicleId)?.details || 'Vehicle'} • 
                  {vehicleLocations.find(v => v.carId === selectedVehicleId)?.status === 'in_use' ? ' Currently In Use' : ' Available'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {availableVehicleOptions.length > 1 && (
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {availableVehicleOptions.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.label} - {vehicle.details}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'live' && (
            <LiveVehicleTracker vehicleId={selectedVehicleId} showGeofences={true} />
          )}
          {activeTab === 'history' && (
            <TripHistory vehicleId={selectedVehicleId} />
          )}
          {activeTab === 'geofence' && (
            <GeofenceManagement vehicleId={selectedVehicleId} />
          )}
        </div>
      </div>
    </div>
  )
}
