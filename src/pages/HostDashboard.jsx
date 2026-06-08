import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cars, hostEarnings, maintenanceSchedules, carWashSchedules } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { getBookings, updateBookingStatus } from '../services/bookingService'
import LiveVehicleTracker from '../components/LiveVehicleTracker'
import TripHistory from '../components/TripHistory'
import GeofenceManagement from '../components/GeofenceManagement'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'vehicles', label: 'My Vehicles', icon: '🚗' },
  { id: 'bookings', label: 'Bookings', icon: '📋' },
  { id: 'tracking', label: 'Vehicle Tracking', icon: '📍' },
  { id: 'earnings', label: 'Earnings', icon: '💰' },
  { id: 'reviews', label: 'Reviews', icon: '⭐' },
  { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { id: 'carwash', label: 'Car Wash', icon: '🧼' },
]

const statusColors = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
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

export default function HostDashboard() {
  const { currentUser } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState(1)
  const [bookingsList, setBookingsList] = useState([])

  const hostId = currentUser?.id || 1

  const myCars = useMemo(() => cars.filter(c => c.hostId === hostId), [hostId])
  const myBookings = useMemo(() => bookingsList.filter(b => myCars.some(c => c.id === b.carId)), [myCars, bookingsList])
  const myMaintenance = useMemo(() => maintenanceSchedules.filter(m => m.hostId === hostId), [hostId])
  const myCarWash = useMemo(() => carWashSchedules.filter(w => w.hostId === hostId), [hostId])

  const totalEarnings = useMemo(() => myBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0), [myBookings])
  const pendingRequests = useMemo(() => myBookings.filter(b => b.status === 'pending').length, [myBookings])

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-indigo-900 to-purple-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🚗
            </div>
            <div>
              <p className="font-bold text-white text-lg">Host Portal</p>
              <p className="text-xs text-indigo-300">{currentUser?.name || 'Host'}</p>
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-700 bg-indigo-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-indigo-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-indigo-700/50">
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
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard label="Total Earnings" value={`$${totalEarnings.toLocaleString()}`} trend={12.5} sub="This month" icon="💰" />
                <AnalyticsCard label="Active Vehicles" value={myCars.length} sub={`${myCars.filter(c => c.available).length} available`} icon="🚗" />
                <AnalyticsCard label="Total Bookings" value={myBookings.length} trend={8.3} sub={`${pendingRequests} pending`} icon="📋" />
                <AnalyticsCard label="Avg. Rating" value="4.8" sub="Across all vehicles" icon="⭐" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard label="Subscription Revenue" value={`$${(totalEarnings * 0.15).toLocaleString()}`} trend={18.2} sub="From subscribers" icon="📅" />
                <AnalyticsCard label="Package Bookings" value="8" trend={22.5} sub="Vacation packages" icon="🌴" />
                <AnalyticsCard label="Delivery Services" value="12" trend={15.3} sub="Airport & anywhere" icon="🚚" />
                <AnalyticsCard label="Add-On Sales" value="24" trend={10.8} sub="Travel equipment" icon="🎒" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📈</span>
                    <h3 className="font-bold text-gray-900 text-lg">Monthly Earnings</h3>
                  </div>
                  <div className="space-y-4">
                    {hostEarnings.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-gray-100 rounded-full h-2">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${(item.earnings / 5200) * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">${item.earnings.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📋</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Bookings</h3>
                  </div>
                  <div className="space-y-4">
                    {myBookings.slice(0, 4).map(booking => {
                      const car = myCars.find(c => c.id === booking.carId)
                      return (
                        <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <img src={car?.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{car?.make} {car?.model}</p>
                            <p className="text-xs text-gray-500">{booking.startDate} → {booking.endDate}</p>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                        </div>
                      )
                    })}
                    {myBookings.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No bookings yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">My Vehicles ({myCars.length})</h3>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Add Vehicle</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCars.map(vehicle => (
                  <div key={vehicle.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <img src={vehicle.images[0]} alt="" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{vehicle.make} {vehicle.model}</h4>
                      <p className="text-sm text-gray-500 mb-2">{vehicle.year} • {vehicle.type} • {vehicle.seats} seats</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-indigo-600">${vehicle.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
                        <span className={`text-xs px-2 py-1 rounded-full ${vehicle.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {vehicle.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 text-sm bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700">Edit</button>
                        <button className="flex-1 text-sm bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300">Analytics</button>
                      </div>
                    </div>
                  </div>
                ))}
                {myCars.length === 0 && (
                  <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                    <p className="text-lg mb-2">No vehicles listed yet</p>
                    <button className="text-indigo-600 hover:underline">Add your first vehicle</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">All Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {myBookings.map(booking => {
                        const car = myCars.find(c => c.id === booking.carId)
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50 text-sm">
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
                    {myCars.map(car => (
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

          {activeSection === 'earnings' && (
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
                          <span className="font-bold text-indigo-600">${item.earnings.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Earnings Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Total Revenue (YTD)</p>
                      <p className="text-2xl font-bold text-indigo-700">${hostEarnings.reduce((sum, e) => sum + e.earnings, 0).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                      <p className="text-2xl font-bold text-green-700">{hostEarnings.reduce((sum, e) => sum + e.bookings, 0)}</p>
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

          {activeSection === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⭐</span>
                  <h3 className="font-bold text-gray-900 text-lg">Reviews & Ratings</h3>
                </div>
                <div className="space-y-4">
                  {myCars.map(car => (
                    <div key={car.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <img src={car.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="font-medium text-gray-900">{car.make} {car.model}</p>
                          <p className="text-sm text-gray-500">{car.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-600">{car.rating} ★</p>
                        <p className="text-xs text-gray-500">{car.reviewCount} reviews</p>
                      </div>
                    </div>
                  ))}
                  {myCars.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'maintenance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">Maintenance Schedule</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {myMaintenance.map(maint => (
                    <div key={maint.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{maint.carName}</h4>
                          <p className="text-sm text-gray-600">{maint.type.replace('_', ' ')} • ${maint.cost}</p>
                          <p className="text-xs text-gray-500 mt-1">Scheduled: {maint.scheduledDate}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${maint.status === 'completed' ? 'bg-green-100 text-green-700' : maint.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {maint.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {myMaintenance.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                      <p className="text-lg mb-2">No maintenance scheduled</p>
                      <button className="text-indigo-600 hover:underline">Schedule maintenance</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'carwash' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">Car Wash Schedule</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {myCarWash.map(wash => (
                    <div key={wash.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{wash.carName}</h4>
                          <p className="text-sm text-gray-600">{wash.type.replace('_', ' ')} • ${wash.cost}</p>
                          <p className="text-xs text-gray-500 mt-1">Scheduled: {wash.scheduledDate}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${wash.status === 'completed' ? 'bg-green-100 text-green-700' : wash.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {wash.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {myCarWash.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                      <p className="text-lg mb-2">No car washes scheduled</p>
                      <button className="text-indigo-600 hover:underline">Schedule car wash</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}