import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { users, cars, bookings, services, adminStats, supportTickets, insuranceClaims } from '../data/mockData'
import { ROLES } from '../data/users'
import FleetMonitoringDashboard from '../components/FleetMonitoringDashboard'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'reminders', label: 'Reminders', icon: '🔔' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'cars', label: 'Vehicles', icon: '🚗' },
  { id: 'bookings', label: 'Bookings', icon: '📋' },
  { id: 'fleet-tracking', label: 'Fleet Tracking', icon: '📍' },
  { id: 'claims', label: 'Claims', icon: '🛡️' },
  { id: 'support', label: 'Support', icon: '🎧' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '📅' },
  { id: 'experiences', label: 'Experiences', icon: '🎯' },
  { id: 'concierge', label: 'Concierge', icon: '🌟' },
  { id: 'services', label: 'Services', icon: '⚙️' },
  { id: 'moderation', label: 'Moderation', icon: '🛡️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

const statusColors = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

const roleColors = {
  [ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-700',
  [ROLES.HOST]: 'bg-blue-100 text-blue-700',
  [ROLES.CUSTOMER]: 'bg-gray-100 text-gray-700',
  [ROLES.FLEET_OWNER]: 'bg-emerald-100 text-emerald-700',
  [ROLES.SUPPORT_AGENT]: 'bg-orange-100 text-orange-700',
  [ROLES.CLAIMS_MANAGER]: 'bg-red-100 text-red-700',
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard label="Total Users" value={adminStats.totalUsers.toLocaleString()} trend={adminStats.monthlyGrowth} sub="+342 this month" icon="👥" />
      <AnalyticsCard label="Total Cars" value={adminStats.totalCars} trend={5.2} sub={`${adminStats.activeListings} active`} icon="🚗" />
      <AnalyticsCard label="Total Bookings" value={adminStats.totalBookings.toLocaleString()} trend={adminStats.monthlyGrowth} sub={`${adminStats.pendingBookings} pending`} icon="📋" />
      <AnalyticsCard label="Total Revenue" value={`$${adminStats.totalRevenue.toLocaleString()}`} trend={adminStats.monthlyGrowth} sub="Avg rating: 4.7★" icon="💰" />
    </div>
  )
}

function NewRevenueStatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
      <AnalyticsCard label="Subscription Revenue" value={`$${adminStats.subscriptionRevenue.toLocaleString()}`} trend={12.5} sub="Monthly recurring" icon="📅" />
      <AnalyticsCard label="Package Sales" value={`$${adminStats.packageSales.toLocaleString()}`} trend={18.2} sub="Vacation packages" icon="🌴" />
      <AnalyticsCard label="Delivery Service" value={`$${adminStats.deliveryServiceRevenue.toLocaleString()}`} trend={8.7} sub="Airport & anywhere" icon="🚚" />
      <AnalyticsCard label="Marketplace Revenue" value={`$${adminStats.marketplaceRevenue.toLocaleString()}`} trend={15.3} sub="Add-ons & services" icon="🎒" />
      <AnalyticsCard label="Commercial Rentals" value={`$${adminStats.commercialRentalRevenue.toLocaleString()}`} trend={22.1} sub="Fleet & business" icon="🏢" />
    </div>
  )
}

function AdminModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function UserForm({ user, onSave, onClose }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || ROLES.CUSTOMER,
  })
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ ...user, ...form }) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
          <option value={ROLES.CUSTOMER}>Customer (Renter)</option>
          <option value={ROLES.HOST}>Host (Vehicle Owner)</option>
          <option value={ROLES.FLEET_OWNER}>Fleet Owner</option>
          <option value={ROLES.SUPPORT_AGENT}>Support Agent</option>
          <option value={ROLES.CLAIMS_MANAGER}>Claims Manager</option>
          <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
        <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg">{user ? 'Save Changes' : 'Add User'}</button>
      </div>
    </form>
  )
}

function CarForm({ car, onSave, onClose, hosts }) {
  const [form, setForm] = useState({
    make: car?.make || '', model: car?.model || '', year: car?.year || '', type: car?.type || 'SUV',
    seats: car?.seats || 5, pricePerDay: car?.pricePerDay || '', location: car?.location || '',
    transmission: car?.transmission || 'Automatic', fuelType: car?.fuelType || 'Gasoline',
    hostId: car?.hostId || (hosts?.[0]?.id || ''),
  })
  const selectedHost = hosts?.find((h) => h.id === Number(form.hostId))
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ ...car, ...form, hostId: Number(form.hostId), host: { name: selectedHost?.name || 'Owner', rating: 5.0, trips: 0 } }) }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Make</label><input type="text" value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Model</label><input type="text" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label><input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"><option>SUV</option><option>Sedan</option><option>Convertible</option><option>Minivan</option><option>Cargo Van</option><option>Luxury SUV</option><option>Pickup Truck</option><option>Moving Truck</option></select></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Price/Day</label><input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Seats</label><select value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"><option value={2}>2</option><option value={4}>4</option><option value={5}>5</option><option value={7}>7</option><option value={8}>8</option></select></div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
      </div>
      {!car && hosts?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Owner</label>
          <select value={form.hostId} onChange={(e) => setForm({ ...form, hostId: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
            {hosts.map((h) => <option key={h.id} value={h.id}>{h.name} ({h.email})</option>)}
          </select>
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
        <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg">{car ? 'Save Changes' : 'Add Car'}</button>
      </div>
    </form>
  )
}

function BookingsTable({ bookings: data, cars: carData, onCancel }) {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter((b) => {
      const car = carData.find((c) => c.id === b.carId)
      return car?.make?.toLowerCase().includes(q) || car?.model?.toLowerCase().includes(q) || b.status.toLowerCase().includes(q)
    })
  }, [data, search, carData])

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bookings by car or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Car</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Dates</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((b) => {
              const car = carData.find((c) => c.id === b.carId)
              return (
                <tr key={b.id} className="hover:bg-gray-50 text-sm">
                  <td className="px-5 py-3 font-mono text-gray-500">#{b.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{car?.make} {car?.model}</td>
                  <td className="px-5 py-3 text-gray-600">{b.guestName || `User #${b.userId}`}</td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{b.startDate} → {b.endDate}</td>
                  <td className="px-5 py-3 font-medium">${b.totalPrice}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[b.status] || ''}`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    {b.status !== 'cancelled' && b.status !== 'completed' ? (
                      <button onClick={() => onCancel(b.id)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">Cancel</button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No bookings found.</div>
        )}
      </div>
    </div>
  )
}

function ServicesManager({ services: data, onAdd, onRemove }) {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter((s) => s.name.toLowerCase().includes(q))
  }, [data, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <button onClick={onAdd} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">+ Add Service</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 text-sm">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-medium text-gray-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-600 max-w-xs">{s.description}</td>
                <td className="px-5 py-3 font-medium">{s.price > 0 ? `$${s.price}` : 'Free'}</td>
                <td className="px-5 py-3">
                  <button onClick={() => onRemove(s.id)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SimpleCardTable({ items, labelKey, descKey, badge, onRemove, emptyMsg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm">{emptyMsg || 'No items.'}</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <div key={item.id || i} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 text-sm">
              <div>
                <p className="font-medium text-gray-900">{labelKey ? item[labelKey] : item.name || item.title}</p>
                {descKey && <p className="text-xs text-gray-500">{item[descKey]}</p>}
              </div>
              <div className="flex items-center gap-3">
                {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{badge(item)}</span>}
                {onRemove && (
                  <button onClick={() => onRemove(item.id)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">Remove</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [modal, setModal] = useState(null)

  const [usersList, setUsersList] = useState(users)
  const [carsList, setCarsList] = useState(cars)
  const [bookingsList, setBookingsList] = useState(bookings)
  const [servicesList, setServicesList] = useState(services)

  const [userSearch, setUserSearch] = useState('')
  const [carSearch, setCarSearch] = useState('')

  const filteredUsers = useMemo(() => {
    if (!userSearch) return usersList
    const q = userSearch.toLowerCase()
    return usersList.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
  }, [usersList, userSearch])

  const filteredCars = useMemo(() => {
    if (!carSearch) return carsList
    const q = carSearch.toLowerCase()
    return carsList.filter((c) => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
  }, [carsList, carSearch])

  const recentBookings = useMemo(() => [...bookingsList].reverse(), [bookingsList])

  const sectionTitle = sidebarItems.find((s) => s.id === activeSection)?.label || ''

  const hosts = useMemo(() => usersList.filter((u) => u.role === ROLES.HOST), [usersList])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🛡️
            </div>
            <div>
              <p className="font-bold text-white text-lg">Admin Panel</p>
              <p className="text-xs text-slate-400">Super Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-slate-700/50">
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
            <span className="text-2xl">{sidebarItems.find((s) => s.id === activeSection)?.icon}</span>
            <h1 className="text-xl font-bold text-gray-900">{sectionTitle}</h1>
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <StatsRow />
              <NewRevenueStatsRow />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📈</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Activity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm p-3 bg-green-50 rounded-xl">
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                      <span className="text-gray-700 font-medium">New booking — Tesla Model 3</span>
                      <span className="ml-auto text-gray-400 text-xs">2 min ago</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm p-3 bg-blue-50 rounded-xl">
                      <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                      <span className="text-gray-700 font-medium">New user registered — Maria G.</span>
                      <span className="ml-auto text-gray-400 text-xs">15 min ago</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm p-3 bg-yellow-50 rounded-xl">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                      <span className="text-gray-700 font-medium">Booking #4 marked as completed</span>
                      <span className="ml-auto text-gray-400 text-xs">1 hour ago</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm p-3 bg-green-50 rounded-xl">
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                      <span className="text-gray-700 font-medium">New car listed — BMW X5 2024</span>
                      <span className="ml-auto text-gray-400 text-xs">3 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm p-3 bg-red-50 rounded-xl">
                      <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                      <span className="text-gray-700 font-medium">Booking #6 cancelled by user</span>
                      <span className="ml-auto text-gray-400 text-xs">5 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">💚</span>
                    <h3 className="font-bold text-gray-900 text-lg">Platform Health</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Active Listings</span><span className="font-bold text-gray-900">{adminStats.activeListings}/{adminStats.totalCars}</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(adminStats.activeListings / adminStats.totalCars) * 100}%` }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Booking Completion</span><span className="font-bold text-gray-900">94.2%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '94.2%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Average Rating</span><span className="font-bold text-gray-900">{adminStats.averageRating} ★</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(adminStats.averageRating / 5) * 100}%` }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Monthly Growth</span><span className="font-bold text-green-600">+{adminStats.monthlyGrowth}%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: `${adminStats.monthlyGrowth * 6}%` }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'reminders' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔔</span>
                  <h3 className="font-bold text-gray-900 text-xl">Pending Reminders</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <span className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-lg font-bold shrink-0">{bookings.filter(b => b.status === 'pending').length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Pending Bookings to Review</p>
                      <p className="text-sm text-gray-500 mt-1">{bookings.filter(b => b.status === 'pending').length} pending booking{bookings.filter(b => b.status === 'pending').length !== 1 ? 's' : ''} need host confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold shrink-0">{users.filter(u => u.role === ROLES.HOST).length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Registered Vehicle Owners</p>
                      <p className="text-sm text-gray-500 mt-1">{hosts.length} hosts managing {cars.filter(c => hosts.some(h => h.id === c.hostId)).length} vehicles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-lg font-bold shrink-0">{cars.filter(c => !c.available).length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Inactive Vehicles</p>
                      <p className="text-sm text-gray-500 mt-1">{cars.filter(c => !c.available).length} vehicle{cars.filter(c => !c.available).length !== 1 ? 's' : ''} marked as unavailable — may need attention</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <span className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold shrink-0">{users.filter(u => u.role === ROLES.CUSTOMER).length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Customer Accounts</p>
                      <p className="text-sm text-gray-500 mt-1">{users.filter(u => u.role === ROLES.CUSTOMER).length} customers registered — {bookings.filter(b => b.status === 'completed').length} completed bookings</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link to="/cars" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🚗</div>
                  <p className="font-semibold text-gray-900">Browse Cars</p>
                  <p className="text-sm text-gray-500 mt-1">Shop as guest</p>
                </Link>
                <Link to="/login" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🔑</div>
                  <p className="font-semibold text-gray-900">Owner Portal</p>
                  <p className="text-sm text-gray-500 mt-1">Login to manage your vehicles</p>
                </Link>
                <Link to="/signup" className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">📝</div>
                  <p className="font-semibold text-gray-900">Become a Host</p>
                  <p className="text-sm text-gray-500 mt-1">Create an account & list your car</p>
                </Link>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="flex-1 max-w-md px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
                <button onClick={() => setModal({ type: 'addUser' })} className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5">+ Add User</button>
              </div>
              <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50 text-sm transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-gray-100" />
                            <span className="font-semibold text-gray-900">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        <td className="px-6 py-4 text-gray-600">{u.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${roleColors[u.role] || ''}`}>
                            {u.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 
                             u.role === ROLES.HOST ? 'Host' :
                             u.role === ROLES.FLEET_OWNER ? 'Fleet Owner' :
                             u.role === ROLES.SUPPORT_AGENT ? 'Support Agent' :
                             u.role === ROLES.CLAIMS_MANAGER ? 'Claims Manager' : 'Customer'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => setModal({ type: 'editUser', user: u })} className="text-xs bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">Edit</button>
                            <button className="text-xs bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'cars' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search cars by make, model, or location..."
                  value={carSearch}
                  onChange={(e) => setCarSearch(e.target.value)}
                  className="flex-1 max-w-md px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
                <button onClick={() => setModal({ type: 'addCar' })} className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5">+ Add Car</button>
              </div>
              <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCars.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 text-sm transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={c.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100" />
                            <span className="font-semibold text-gray-900">{c.year} {c.make} {c.model}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{c.host.name}</td>
                        <td className="px-6 py-4 text-gray-600">{c.type}</td>
                        <td className="px-6 py-4 text-gray-600">{c.location}</td>
                        <td className="px-6 py-4 font-semibold">${c.pricePerDay}/day</td>
                        <td className="px-6 py-4">⭐ {c.rating}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {c.available ? (
                              <button onClick={() => setCarsList((prev) => prev.map((x) => x.id === c.id ? { ...x, available: false } : x))} className="text-xs bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors">Suspend</button>
                            ) : (
                              <button onClick={() => setCarsList((prev) => prev.map((x) => x.id === c.id ? { ...x, available: true } : x))} className="text-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">Approve</button>
                            )}
                            <button onClick={() => setModal({ type: 'editCar', car: c })} className="text-xs bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">Edit</button>
                            <button onClick={() => setCarsList((prev) => prev.filter((x) => x.id !== c.id))} className="text-xs bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <BookingsTable bookings={recentBookings} cars={carsList} onCancel={(id) => setBookingsList((prev) => prev.map((b) => b.id === id ? { ...b, status: 'cancelled' } : b))} />
          )}

          {activeSection === 'fleet-tracking' && (
            <FleetMonitoringDashboard />
          )}

          {activeSection === 'subscriptions' && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Active Subscription Plans</h3>
              <SimpleCardTable
                items={[
                  { id: 1, name: 'Basic Plan', price: 49, active: 124 },
                  { id: 2, name: 'Family Plan', price: 89, active: 67 },
                  { id: 3, name: 'Business Plan', price: 149, active: 43 },
                ]}
                labelKey="name"
                descKey={null}
                badge={(item) => `${item.active} subscribers`}
                emptyMsg="No subscription plans."
              />
            </div>
          )}

          {activeSection === 'experiences' && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Local Experiences</h3>
              <SimpleCardTable
                items={[
                  { id: 1, name: 'Miami City Tour', host: 'Sarah Johnson', price: 75 },
                  { id: 2, name: 'Deep Sea Fishing', host: 'Mike Chen', price: 120 },
                  { id: 3, name: 'Everglades Adventure', host: 'Emily Davis', price: 95 },
                ]}
                labelKey="name"
                descKey="host"
                badge={(item) => `$${item.price}`}
                emptyMsg="No experiences yet."
              />
            </div>
          )}

          {activeSection === 'concierge' && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Concierge Services</h3>
              <SimpleCardTable
                items={[
                  { id: 1, name: 'Hotel Booking', provider: 'Ana Martinez', price: 0 },
                  { id: 2, name: 'Restaurant Reservations', provider: 'Ana Martinez', price: 0 },
                  { id: 3, name: 'Theme Park Planning', provider: 'Sarah Johnson', price: 50 },
                ]}
                labelKey="name"
                descKey="provider"
                badge={(item) => item.price > 0 ? `$${item.price}` : 'Free'}
                emptyMsg="No concierge services."
              />
            </div>
          )}

          {activeSection === 'services' && (
            <ServicesManager
              services={servicesList}
              onAdd={() => setModal({ type: 'addService' })}
              onRemove={(id) => setServicesList((prev) => prev.filter((s) => s.id !== id))}
            />
          )}

          {activeSection === 'moderation' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="font-bold text-gray-900 text-xl">Moderation Center</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <span className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-lg font-bold shrink-0">{cars.filter(c => !c.available).length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Pending Vehicle Approvals</p>
                      <p className="text-sm text-gray-500 mt-1">{cars.filter(c => !c.available).length} vehicle{cars.filter(c => !c.available).length !== 1 ? 's' : ''} awaiting approval</p>
                    </div>
                    <Link to="/cars" className="text-xs bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Review</Link>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold shrink-0">0</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Reported Content</p>
                      <p className="text-sm text-gray-500 mt-1">No reported content — all clear</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold shrink-0">{bookings.filter(b => b.status === 'pending').length}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Flagged Bookings</p>
                      <p className="text-sm text-gray-500 mt-1">{bookings.filter(b => b.status === 'pending').length} pending bookings flagged for review</p>
                    </div>
                    <button onClick={() => setActiveSection('bookings')} className="text-xs bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Review</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎁</span>
                  <h3 className="font-bold text-gray-900 text-xl">Promotions & Discounts</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl transition-shadow">
                    <p className="text-sm opacity-90 font-medium">Summer Special</p>
                    <p className="text-3xl font-bold mt-2">20% OFF</p>
                    <p className="text-xs opacity-75 mt-3">All convertibles</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl transition-shadow">
                    <p className="text-sm opacity-90 font-medium">First Booking</p>
                    <p className="text-3xl font-bold mt-2">$50 OFF</p>
                    <p className="text-xs opacity-75 mt-3">New customers only</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-shadow">
                    <p className="text-sm opacity-90 font-medium">Weekly Rental</p>
                    <p className="text-3xl font-bold mt-2">Free Day</p>
                    <p className="text-xs opacity-75 mt-3">Book 7+ days</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'claims' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">Insurance Claims Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-2xl font-bold text-yellow-700">{insuranceClaims.filter(c => c.status === 'pending_review' || c.status === 'in_review').length}</p>
                      <p className="text-sm text-yellow-600">Pending Review</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-700">{insuranceClaims.filter(c => c.status === 'approved').length}</p>
                      <p className="text-sm text-green-600">Approved</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <p className="text-2xl font-bold text-red-700">{insuranceClaims.filter(c => c.status === 'rejected').length}</p>
                      <p className="text-sm text-red-600">Rejected</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-2xl font-bold text-purple-700">${insuranceClaims.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.damageEstimate, 0).toLocaleString()}</p>
                      <p className="text-sm text-purple-600">Total Payouts</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estimate</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {insuranceClaims.map(claim => (
                          <tr key={claim.id} className="hover:bg-gray-50 text-sm">
                            <td className="px-4 py-3 font-mono text-gray-500">#{claim.id}</td>
                            <td className="px-4 py-3 text-gray-900">{claim.userName}</td>
                            <td className="px-4 py-3 text-gray-600 capitalize">{claim.incidentType.replace('_', ' ')}</td>
                            <td className="px-4 py-3 font-medium">${claim.damageEstimate.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${claim.status === 'approved' ? 'bg-green-100 text-green-700' : claim.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {claim.status.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'support' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">Support Tickets Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-2xl font-bold text-yellow-700">{supportTickets.filter(t => t.status === 'open').length}</p>
                      <p className="text-sm text-yellow-600">Open</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-700">{supportTickets.filter(t => t.status === 'in_progress').length}</p>
                      <p className="text-sm text-blue-600">In Progress</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-700">{supportTickets.filter(t => t.status === 'resolved').length}</p>
                      <p className="text-sm text-green-600">Resolved</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <p className="text-2xl font-bold text-red-700">{supportTickets.filter(t => t.priority === 'high' || t.priority === 'urgent').length}</p>
                      <p className="text-sm text-red-600">High Priority</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {supportTickets.map(ticket => (
                          <tr key={ticket.id} className="hover:bg-gray-50 text-sm">
                            <td className="px-4 py-3 font-mono text-gray-500">#{ticket.id}</td>
                            <td className="px-4 py-3 text-gray-900">{ticket.userName}</td>
                            <td className="px-4 py-3 text-gray-600">{ticket.subject}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ticket.priority === 'high' || ticket.priority === 'urgent' ? 'bg-red-100 text-red-700' : ticket.priority === 'medium' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {ticket.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚙️</span>
                  <h3 className="font-bold text-gray-900 text-xl">Platform Settings</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Commission Rate (%)</label>
                      <input type="number" defaultValue="15" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Booking Duration (days)</label>
                      <input type="number" defaultValue="1" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy (hours)</label>
                      <input type="number" defaultValue="24" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Host Approval Required</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdminModal isOpen={modal?.type === 'addUser' || modal?.type === 'editUser'} title={modal?.type === 'addUser' ? 'Add User' : 'Edit User'} onClose={() => setModal(null)}>
        <UserForm user={modal?.user} onSave={(data) => { setUsersList((prev) => modal?.user ? prev.map((u) => u.id === data.id ? data : u) : [...prev, { ...data, id: prev.length + 1, avatar: `https://i.pravatar.cc/150?u=${data.email}` }]); setModal(null) }} onClose={() => setModal(null)} />
      </AdminModal>

      <AdminModal isOpen={modal?.type === 'addCar' || modal?.type === 'editCar'} title={modal?.type === 'addCar' ? 'Add Car' : 'Edit Car'} onClose={() => setModal(null)}>
        <CarForm car={modal?.car} hosts={hosts} onSave={(data) => { setCarsList((prev) => modal?.car ? prev.map((c) => c.id === data.id ? data : c) : [...prev, { ...data, id: prev.length + 1, images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80'], features: [], rating: 0, reviewCount: 0, available: true }]); setModal(null) }} onClose={() => setModal(null)} />
      </AdminModal>

      <AdminModal isOpen={modal?.type === 'addService'} title="Add Service" onClose={() => setModal(null)}>
        <p className="text-sm text-gray-500 mb-4">Fill in the service details below.</p>
        <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); setServicesList((prev) => [...prev, { id: prev.length + 1, name: fd.get('name'), description: fd.get('description'), price: Number(fd.get('price')) || 0, icon: fd.get('icon') || '➕' }]); setModal(null) }} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input name="name" type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea name="description" rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label><input name="price" type="number" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label><input name="icon" type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="🌟" /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
            <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg">Add Service</button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}