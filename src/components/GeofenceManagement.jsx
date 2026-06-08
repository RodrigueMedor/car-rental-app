import { useState } from 'react'
import { geofences, geofenceAlerts, vehicleLocations } from '../data/vehicleTracking'

export default function GeofenceManagement({ vehicleId }) {
  const [selectedGeofence, setSelectedGeofence] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    radius: 50000,
    alertOnExit: true,
    alertOnEntry: false,
  })

  const filteredGeofences = vehicleId
    ? geofences.filter(g => g.carId === vehicleId)
    : geofences

  const filteredAlerts = vehicleId
    ? geofenceAlerts.filter(a => a.carId === vehicleId)
    : geofenceAlerts

  const handleCreateGeofence = () => {
    setShowCreateModal(false)
    // In a real app, this would send data to backend
  }

  const acknowledgeAlert = (alertId) => {
    // In a real app, this would update the alert status
    console.log('Acknowledging alert:', alertId)
  }

  const alertSeverityColors = {
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Geofence List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Active Geofences</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            + Create Geofence
          </button>
        </div>

        {filteredGeofences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No geofences configured</p>
        ) : (
          <div className="space-y-4">
            {filteredGeofences.map(geofence => (
              <div
                key={geofence.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedGeofence(geofence)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{geofence.name}</p>
                      <p className="text-sm text-gray-500">Vehicle #{geofence.carId}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${geofence.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {geofence.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Radius</p>
                    <p className="font-medium">{(geofence.radius / 1000).toFixed(1)} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Alert on Exit</p>
                    <p className="font-medium">{geofence.alertOnExit ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Alert on Entry</p>
                    <p className="font-medium">{geofence.alertOnEntry ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geofence Alerts */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Recent Alerts</h3>

        {filteredAlerts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent alerts</p>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`border rounded-xl p-4 ${alert.acknowledged ? 'border-gray-200 bg-gray-50' : 'border-orange-300 bg-orange-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">⚠️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Vehicle #{alert.carId} {alert.type === 'exit' ? 'exited' : 'entered'} geofence
                      </p>
                      <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${alertSeverityColors[alert.severity]}`}>
                    {alert.severity}
                  </span>
                </div>

                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    Acknowledge Alert
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Geofence Modal */}
      {selectedGeofence && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedGeofence.name}</h2>
                <button
                  onClick={() => setSelectedGeofence(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle ID</label>
                  <p className="text-gray-900">{selectedGeofence.carId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Center Location</label>
                  <p className="font-mono text-sm text-gray-700">
                    {selectedGeofence.center.lat.toFixed(6)}, {selectedGeofence.center.lng.toFixed(6)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
                  <p className="text-gray-900">{(selectedGeofence.radius / 1000).toFixed(1)} km</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Alert on Exit</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${selectedGeofence.alertOnExit ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedGeofence.alertOnExit ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Alert on Entry</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${selectedGeofence.alertOnEntry ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedGeofence.alertOnEntry ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Status</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${selectedGeofence.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedGeofence.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors">
                  Edit Geofence
                </button>
                <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 rounded-xl transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Geofence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Geofence</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Geofence Name</label>
                  <input
                    type="text"
                    value={newGeofence.name}
                    onChange={(e) => setNewGeofence({ ...newGeofence, name: e.target.value })}
                    placeholder="e.g., Orlando Metro Area"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Radius (km)</label>
                  <input
                    type="number"
                    value={newGeofence.radius / 1000}
                    onChange={(e) => setNewGeofence({ ...newGeofence, radius: Number(e.target.value) * 1000 })}
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Alert on Exit</span>
                  <button
                    onClick={() => setNewGeofence({ ...newGeofence, alertOnExit: !newGeofence.alertOnExit })}
                    className={`w-12 h-6 rounded-full transition-colors ${newGeofence.alertOnExit ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform ${newGeofence.alertOnExit ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Alert on Entry</span>
                  <button
                    onClick={() => setNewGeofence({ ...newGeofence, alertOnEntry: !newGeofence.alertOnEntry })}
                    className={`w-12 h-6 rounded-full transition-colors ${newGeofence.alertOnEntry ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform ${newGeofence.alertOnEntry ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleCreateGeofence}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Create Geofence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
