import { useState } from 'react'
import { commercialVehicles } from '../data/mockData'

export default function FleetManagement() {
  const [activeTab, setActiveTab] = useState('overview')

  const fleetStats = {
    totalVehicles: commercialVehicles.length,
    activeRentals: 12,
    monthlyRevenue: 45800,
    utilizationRate: 78,
    maintenanceDue: 3,
    drivers: 8,
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg h-screen fixed">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Fleet Management</h2>
            <nav className="space-y-2">
              {['overview', 'vehicles', 'revenue', 'drivers', 'maintenance', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Fleet Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">🚚</span>
                    <span className="text-green-500 text-sm font-medium">+12%</span>
                  </div>
                  <p className="text-gray-500 text-sm">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">{fleetStats.totalVehicles}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">📊</span>
                    <span className="text-green-500 text-sm font-medium">+8%</span>
                  </div>
                  <p className="text-gray-500 text-sm">Active Rentals</p>
                  <p className="text-2xl font-bold text-gray-900">{fleetStats.activeRentals}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">💰</span>
                    <span className="text-green-500 text-sm font-medium">+15%</span>
                  </div>
                  <p className="text-gray-500 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${fleetStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">📈</span>
                    <span className="text-red-500 text-sm font-medium">-3%</span>
                  </div>
                  <p className="text-gray-500 text-sm">Utilization Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{fleetStats.utilizationRate}%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="text-2xl">🚗</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Vehicle #{100 + i} rented</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                        <span className="text-green-600 font-medium">+$450</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Maintenance Alerts</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                        <span className="text-2xl">🔧</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Vehicle #{100 + i} needs service</p>
                          <p className="text-sm text-gray-500">Oil change due</p>
                        </div>
                        <span className="text-red-600 font-medium">Urgent</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Fleet Vehicles</h1>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Revenue</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commercialVehicles.map(vehicle => (
                      <tr key={vehicle.id} className="border-t border-gray-100">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={vehicle.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                              <p className="text-sm text-gray-500">{vehicle.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{vehicle.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            vehicle.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {vehicle.available ? 'Available' : 'Rented'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">${vehicle.monthlyRate}/mo</td>
                        <td className="px-6 py-4 text-gray-700">{Math.round(Math.random() * 30 + 60)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Revenue Management</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue</h3>
                  <p className="text-4xl font-bold text-green-600">$45,800</p>
                  <p className="text-sm text-gray-500 mt-2">+15% from last month</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profit Margin</h3>
                  <p className="text-4xl font-bold text-blue-600">32%</p>
                  <p className="text-sm text-gray-500 mt-2">+2% from last month</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">YTD Revenue</h3>
                  <p className="text-4xl font-bold text-purple-600">$287,400</p>
                  <p className="text-sm text-gray-500 mt-2">On track for $500K</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Vehicle Type</h3>
                <div className="space-y-4">
                  {['Cargo Van', 'Box Truck', 'Pickup Truck', 'Moving Truck'].map((type, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-32 text-gray-700">{type}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-primary-600 h-4 rounded-full" 
                          style={{ width: `${Math.random() * 40 + 40}%` }}
                        ></div>
                      </div>
                      <span className="w-24 text-right font-medium">${(Math.random() * 10000 + 5000).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drivers' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Driver Management</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={`https://i.pravatar.cc/150?u=driver${i}`} alt="" className="w-16 h-16 rounded-full" />
                      <div>
                        <h3 className="font-bold text-gray-900">Driver {i}</h3>
                        <p className="text-sm text-gray-500">Commercial License</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating</span>
                        <span className="font-medium">⭐ {4.5 + Math.random() * 0.5}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Trips</span>
                        <span className="font-medium">{Math.round(Math.random() * 200 + 50)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Maintenance Tracking</h1>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { vehicle: 'Ford Transit Cargo', service: 'Oil Change', due: '2024-01-15', priority: 'High', status: 'Pending' },
                      { vehicle: 'Ram ProMaster 2500', service: 'Tire Rotation', due: '2024-01-20', priority: 'Medium', status: 'Scheduled' },
                      { vehicle: 'Chevrolet Silverado 3500HD', service: 'Brake Inspection', due: '2024-01-25', priority: 'Low', status: 'Pending' },
                    ].map((item, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.vehicle}</td>
                        <td className="px-6 py-4 text-gray-700">{item.service}</td>
                        <td className="px-6 py-4 text-gray-700">{item.due}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'High' ? 'bg-red-100 text-red-700' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Trends</h3>
                  <div className="space-y-4">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="w-16 text-gray-700">{month}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-6 rounded-full" 
                            style={{ width: `${Math.random() * 50 + 30}%` }}
                          ></div>
                        </div>
                        <span className="w-20 text-right font-medium">{Math.round(Math.random() * 50 + 20)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Fleet Utilization</h3>
                  <div className="space-y-4">
                    {commercialVehicles.slice(0, 5).map((vehicle, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="w-32 text-gray-700 text-sm truncate">{vehicle.make}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-green-500 h-4 rounded-full" 
                            style={{ width: `${Math.random() * 40 + 50}%` }}
                          ></div>
                        </div>
                        <span className="w-16 text-right font-medium text-sm">{Math.round(Math.random() * 30 + 50)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
