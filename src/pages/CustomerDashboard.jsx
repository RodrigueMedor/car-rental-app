import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { bookings, cars } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'bookings', label: 'My Bookings', icon: '📋' },
  { id: 'favorites', label: 'Favorites', icon: '❤️' },
  { id: 'reviews', label: 'My Reviews', icon: '⭐' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

const statusColors = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  active: 'bg-purple-100 text-purple-700',
}

function AnalyticsCard({ label, value, sub, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  )
}

function StatsRow({ userBookings }) {
  const totalSpent = userBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0)
  const completedTrips = userBookings.filter(b => b.status === 'completed').length
  const upcomingTrips = userBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard label="Total Bookings" value={userBookings.length} sub={`${completedTrips} completed`} icon="📋" />
      <AnalyticsCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} sub="Lifetime spending" icon="💰" />
      <AnalyticsCard label="Upcoming Trips" value={upcomingTrips} sub="Confirmed & Pending" icon="🚗" />
      <AnalyticsCard label="Driver Score" value="4.6" sub="Based on reviews" icon="⭐" />
    </div>
  )
}

function NewServicesStatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <AnalyticsCard label="Subscription" value="Active" sub="Premium Plan" icon="📅" />
      <AnalyticsCard label="Packages" value="2" sub="Vacation packages" icon="🌴" />
      <AnalyticsCard label="Delivery Services" value="3" sub="Airport & anywhere" icon="🚚" />
      <AnalyticsCard label="Add-Ons" value="5" sub="Travel equipment" icon="🎒" />
    </div>
  )
}

export default function CustomerDashboard() {
  const { currentUser } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState([1, 4, 7])

  const userBookings = useMemo(() => {
    if (!currentUser) return []
    return bookings.filter(b => b.userId === currentUser.id)
  }, [currentUser])

  const favoriteCars = useMemo(() => {
    return cars.filter(c => favorites.includes(c.id))
  }, [favorites])

  const toggleFavorite = (carId) => {
    setFavorites(prev => prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId])
  }

  const sectionTitle = sidebarItems.find(s => s.id === activeSection)?.label || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🚗
            </div>
            <div>
              <p className="font-bold text-white text-lg">Customer Portal</p>
              <p className="text-xs text-blue-300">{currentUser?.name || 'Guest'}</p>
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
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700 bg-blue-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-blue-700/50">
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
              <StatsRow userBookings={userBookings} />
              <NewServicesStatsRow />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📋</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Bookings</h3>
                  </div>
                  <div className="space-y-4">
                    {userBookings.slice(0, 3).map(booking => {
                      const car = cars.find(c => c.id === booking.carId)
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
                    {userBookings.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No bookings yet</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">❤️</span>
                    <h3 className="font-bold text-gray-900 text-lg">Favorite Vehicles</h3>
                  </div>
                  <div className="space-y-4">
                    {favoriteCars.slice(0, 3).map(car => (
                      <div key={car.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <img src={car.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{car.make} {car.model}</p>
                          <p className="text-xs text-gray-500">${car.pricePerDay}/day • {car.location}</p>
                        </div>
                        <Link to={`/cars/${car.id}`} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">View</Link>
                      </div>
                    ))}
                    {favoriteCars.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No favorites yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ready for your next adventure?</h3>
                    <p className="text-blue-100">Browse our wide selection of vehicles for any occasion</p>
                  </div>
                  <Link to="/cars" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                    Browse Cars
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">All Bookings</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {userBookings.map(booking => {
                    const car = cars.find(c => c.id === booking.carId)
                    return (
                      <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <img src={car?.images[0]} alt="" className="w-24 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{car?.make} {car?.model}</h4>
                                <p className="text-sm text-gray-500">{car?.year} • {car?.type}</p>
                              </div>
                              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <span>📅 {booking.startDate} → {booking.endDate}</span>
                              <span>💰 ${booking.totalPrice}</span>
                              <span>📍 {booking.pickupLocation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {userBookings.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                      <p className="text-lg mb-2">No bookings yet</p>
                      <Link to="/cars" className="text-blue-600 hover:underline">Browse vehicles to make your first booking</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'favorites' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map(car => (
                  <div key={car.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <div className="relative">
                      <img src={car.images[0]} alt="" className="w-full h-48 object-cover" />
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <span className="text-xl">{favorites.includes(car.id) ? '❤️' : '🤍'}</span>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{car.make} {car.model}</h3>
                      <p className="text-sm text-gray-500 mb-2">{car.year} • {car.type} • {car.seats} seats</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-blue-600">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
                        <Link to={`/cars/${car.id}`} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View</Link>
                      </div>
                    </div>
                  </div>
                ))}
                {favoriteCars.length === 0 && (
                  <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                    <p className="text-lg mb-2">No favorites yet</p>
                    <Link to="/cars" className="text-blue-600 hover:underline">Browse vehicles to add to your favorites</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">⭐</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">My Reviews</h3>
                <p className="text-gray-500 mb-4">You haven't left any reviews yet</p>
                <p className="text-sm text-gray-400">Reviews will appear here after you complete trips and leave feedback</p>
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <img src={currentUser?.avatar} alt="" className="w-24 h-24 rounded-full ring-4 ring-gray-100" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h3>
                    <p className="text-gray-500">{currentUser?.email}</p>
                    <p className="text-gray-500">{currentUser?.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={currentUser?.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" defaultValue={currentUser?.email} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" defaultValue={currentUser?.phone} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver License</label>
                    <input type="text" placeholder="Enter license number" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Save Changes
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {currentUser?.badges?.map((badge, index) => (
                    <span key={index} className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-full text-sm font-medium">
                      🏆 {badge}
                    </span>
                  ))}
                  {(!currentUser?.badges || currentUser.badges.length === 0) && (
                    <p className="text-sm text-gray-500">No badges earned yet</p>
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
