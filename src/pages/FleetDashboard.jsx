import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cars, hostEarnings } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { getBookings, updateBookingStatus } from '../services/bookingService'
import LiveVehicleTracker from '../components/LiveVehicleTracker'
import TripHistory from '../components/TripHistory'
import GeofenceManagement from '../components/GeofenceManagement'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'vehicles', label: 'Fleet Vehicles', icon: '🚗' },
  { id: 'bookings', label: 'Bookings', icon: '📋' },
  { id: 'tracking', label: 'Vehicle Tracking', icon: '📍' },
  { id: 'revenue', label: 'Revenue', icon: '💰' },
  { id: 'employees', label: 'Employees', icon: '👥' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'utilization', label: 'Utilization', icon: '📉' },
]

const statusColors = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  active: 'bg-purple-100 text-purple-700',
}

function AnalyticsCard({ label, value, sub, trend, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <div className="flex items-center gap-2">
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
        {sub && <span className="text-xs text-gray-400">{sub}</span>}
      </div>
    </div>
  )
}

function StatsRow() {
  const fleetVehicles = cars.slice(0, 8)
  const totalRevenue = hostEarnings.reduce((sum, e) => sum + e.earnings, 0)
  const totalBookings = hostEarnings.reduce((sum, e) => sum + e.bookings, 0)
  const utilizationRate = 78.5

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard label="Fleet Vehicles" value={fleetVehicles.length} sub="Active fleet" icon="🚗" />
      <AnalyticsCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} trend={15.2} sub="This year" icon="💰" />
      <AnalyticsCard label="Total Bookings" value={totalBookings} trend={12.8} sub="All time" icon="📋" />
      <AnalyticsCard label="Utilization Rate" value={`${utilizationRate}%`} trend={3.5} sub="Fleet efficiency" icon="📈" />
    </div>
  )
}

function NewFleetStatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <AnalyticsCard label="Commercial Rentals" value="$45,800" trend={22.1} sub="Monthly revenue" icon="🏢" />
      <AnalyticsCard label="Subscription Fleet" value="12" trend={18.5} sub="Vehicles on sub" icon="📅" />
      <AnalyticsCard label="Delivery Fleet" value="8" trend={15.3} sub="Airport & anywhere" icon="🚚" />
      <AnalyticsCard label="Fleet Utilization" value="82%" trend={5.2} sub="Overall efficiency" icon="📊" />
    </div>
  )
}

export default function FleetDashboard() {
  const { currentUser } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bookingsList, setBookingsList] = useState([])
  const [selectedVehicleId, setSelectedVehicleId] = useState(1)

  const fleetVehicles = useMemo(() => cars.slice(0, 8), [])
  const fleetBookings = useMemo(() => bookingsList.filter(b => fleetVehicles.some(v => v.id === b.carId)), [fleetVehicles, bookingsList])

  const handleAcceptBooking = async (bookingId) => {
    await updateBookingStatus(bookingId, 'confirmed')
    loadBookings()
  }

  const handleDeclineBooking = async (bookingId) => {
    await updateBookingStatus(bookingId, 'cancelled')
    loadBookings()
  }

  const loadBookings = async () => {
    const { data } = await getBookings()
    setBookingsList(data)
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const sectionTitle = sidebarItems.find(s => s.id === activeSection)?.label || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-emerald-900 to-teal-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🚛
            </div>
            <div>
              <p className="font-bold text-white text-lg">Fleet Portal</p>
              <p className="text-xs text-emerald-300">{currentUser?.name || 'Fleet Manager'}</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-700 bg-emerald-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-emerald-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-emerald-700/50">
            <span>←</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4 flex items-center gap-4 z-20 shadow-sm">
          <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sidebarItems.find(s => s.id === activeSection)?.icon}</span>
            <h1 className="text-xl font-bold text-gray-900">{sectionTitle}</h1>
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <StatsRow />
              <NewFleetStatsRow />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📈</span>
                    <h3 className="font-bold text-gray-900 text-lg">Revenue Overview</h3>
                  </div>
                  <div className="space-y-4">
                    {hostEarnings.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-gray-100 rounded-full h-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: `${(item.earnings / 5200) * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">${item.earnings.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">🚗</span>
                    <h3 className="font-bold text-gray-900 text-lg">Fleet Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <span className="text-sm text-gray-700">Active Vehicles</span>
                      <span className="font-bold text-green-700">{fleetVehicles.filter(v => v.available).length}/{fleetVehicles.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm text-gray-700">Avg. Daily Rate</span>
                      <span className="font-bold text-blue-700">${Math.round(fleetVehicles.reduce((sum, v) => sum + v.pricePerDay, 0) / fleetVehicles.length)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                      <span className="text-sm text-gray-700">Avg. Rating</span>
                      <span className="font-bold text-purple-700">{(fleetVehicles.reduce((sum, v) => sum + v.rating, 0) / fleetVehicles.length).toFixed(1)} ★</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                      <span className="text-sm text-gray-700">Pending Bookings</span>
                      <span className="font-bold text-yellow-700">{fleetBookings.filter(b => b.status === 'pending').length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Fleet Bookings</h3>
                  </div>
                  <button className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {fleetBookings.slice(0, 5).map(booking => {
                        const car = fleetVehicles.find(v => v.id === booking.carId)
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50 text-sm">
                            <td className="px-4 py-3 font-medium text-gray-900">{car?.make} {car?.model}</td>
                            <td className="px-4 py-3 text-gray-600">{booking.startDate} → {booking.endDate}</td>
                            <td className="px-4 py-3 font-medium">${booking.totalPrice}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Fleet Vehicles</h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Add Vehicle</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fleetVehicles.map(vehicle => (
                  <div key={vehicle.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <img src={vehicle.images[0]} alt="" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{vehicle.make} {vehicle.model}</h4>
                      <p className="text-sm text-gray-500 mb-2">{vehicle.year} • {vehicle.type}</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-emerald-600">${vehicle.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
                        <span className={`text-xs px-2 py-1 rounded-full ${vehicle.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {vehicle.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 text-sm bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700">Edit</button>
                        <button className="flex-1 text-sm bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300">Analytics</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">All Fleet Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {fleetBookings.map(booking => {
                        const car = fleetVehicles.find(v => v.id === booking.carId)
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50 text-sm">
                            <td className="px-6 py-4 font-mono text-gray-500">#{booking.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{car?.make} {car?.model}</td>
                            <td className="px-6 py-4 text-gray-600">{booking.startDate} → {booking.endDate}</td>
                            <td className="px-6 py-4 font-medium">${booking.totalPrice}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                            </td>
                            <td className="px-6 py-4">
                              {booking.status === 'pending' && (
                                <div className="flex gap-2">
                                  <button onClick={() => handleAcceptBooking(booking.id)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">Accept</button>
                                  <button onClick={() => handleDeclineBooking(booking.id)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">Decline</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'tracking' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Vehicle Tracking</h3>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    {fleetVehicles.map(car => (
                      <option key={car.id} value={car.id}>{car.year} {car.make} {car.model}</option>
                    ))}
                  </select>
                </div>
                <LiveVehicleTracker vehicleId={selectedVehicleId} showGeofences={true} />
              </div>
              <TripHistory vehicleId={selectedVehicleId} />
              <GeofenceManagement vehicleId={selectedVehicleId} />
            </div>
          )}

          {activeSection === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Monthly Revenue</h3>
                  <div className="space-y-4">
                    {hostEarnings.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">{item.bookings} bookings</span>
                          <span className="font-bold text-emerald-600">${item.earnings.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Revenue Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Total Revenue (YTD)</p>
                      <p className="text-2xl font-bold text-emerald-700">${hostEarnings.reduce((sum, e) => sum + e.earnings, 0).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                      <p className="text-2xl font-bold text-blue-700">{hostEarnings.reduce((sum, e) => sum + e.bookings, 0)}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Avg. Revenue per Booking</p>
                      <p className="text-2xl font-bold text-purple-700">${Math.round(hostEarnings.reduce((sum, e) => sum + e.earnings, 0) / hostEarnings.reduce((sum, e) => sum + e.bookings, 0))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'employees' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Add Employee</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'John Smith', role: 'Fleet Manager', email: 'john@fleet.com', status: 'active' },
                  { name: 'Sarah Johnson', role: 'Maintenance Lead', email: 'sarah@fleet.com', status: 'active' },
                  { name: 'Mike Davis', role: 'Driver', email: 'mike@fleet.com', status: 'active' },
                  { name: 'Emily Brown', role: 'Coordinator', email: 'emily@fleet.com', status: 'active' },
                ].map((employee, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl">👤</div>
                      <div>
                        <h4 className="font-bold text-gray-900">{employee.name}</h4>
                        <p className="text-sm text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{employee.email}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${employee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {employee.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Vehicle Performance</h3>
                  <div className="space-y-4">
                    {fleetVehicles.slice(0, 5).map(vehicle => (
                      <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <img src={vehicle.images[0]} alt="" className="w-12 h-8 object-cover rounded" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                            <p className="text-xs text-gray-500">{vehicle.rating} ★ • {vehicle.reviewCount} reviews</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-600">${vehicle.pricePerDay}/day</p>
                          <p className="text-xs text-gray-500">{bookings.filter(b => b.carId === vehicle.id).length} bookings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Booking Trends</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Peak Season</p>
                      <p className="font-bold text-blue-700">June - August</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Most Popular Vehicle Type</p>
                      <p className="font-bold text-green-700">SUV</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Avg. Rental Duration</p>
                      <p className="font-bold text-purple-700">4.2 days</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Cancellation Rate</p>
                      <p className="font-bold text-yellow-700">3.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'utilization' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-5">Fleet Utilization Report</h3>
                <div className="space-y-4">
                  {fleetVehicles.map(vehicle => {
                    const vehicleBookings = bookings.filter(b => b.carId === vehicle.id)
                    const utilization = Math.min(100, (vehicleBookings.length / 12) * 100)
                    return (
                      <div key={vehicle.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</span>
                          <span className="text-gray-600">{utilization.toFixed(0)}% utilized</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div className={`h-3 rounded-full transition-all duration-500 ${utilization > 70 ? 'bg-green-500' : utilization > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${utilization}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
