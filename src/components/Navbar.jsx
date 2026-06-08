import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRole, ROLES } from '../context/RoleContext'

function DropdownMenu({ label, items, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = items.some((item) => pathname === item.path)

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
        }`}
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                pathname === item.path ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const { isHost, isSuperAdmin, isCustomer, isFleetOwner, isSupportAgent, isClaimsManager } = useRole()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const primaryLinks = [
    { path: '/', label: 'Home' },
    { path: '/cars', label: 'Browse Cars' },
  ]

  const vehicleLinks = [
    { path: '/cars', label: 'Browse Cars', icon: '🚗' },
    { path: '/commercial-vehicles', label: 'Commercial Vehicles', icon: '🚚' },
    { path: '/cargo', label: 'Cargo & Trucks', icon: '🚛' },
    { path: '/rent-to-own', label: 'Rent-to-Own', icon: '🏠' },
    { path: '/auto-sales', label: 'Auto Sales', icon: '🚙' },
    { path: '/subscriptions', label: 'Subscription Plans', icon: '📋' },
    { path: '/inspection', label: 'Vehicle Inspection', icon: '🔍' },
  ]

  const travelLinks = [
    { path: '/services', label: 'All Services', icon: '⚙️' },
    { path: '/vacation-packages', label: 'Vacation Packages', icon: '🌴' },
    { path: '/airport-concierge', label: 'Airport Concierge', icon: '✈️' },
    { path: '/driver-service', label: 'Driver Service', icon: '👨‍✈️' },
    { path: '/delivery-service', label: 'Delivery Service', icon: '🚚' },
    { path: '/travel-addons', label: 'Travel Add-Ons', icon: '🎒' },
    { path: '/mechanic-marketplace', label: 'Mechanic Marketplace', icon: '🔧' },
    { path: '/roadside-assistance', label: 'Roadside Assistance', icon: '🚨' },
    { path: '/vehicle-tracking', label: 'Vehicle Tracking', icon: '📍' },
    { path: '/travel-planner', label: 'AI Travel Planner', icon: '🤖' },
    { path: '/experiences', label: 'Local Experiences', icon: '🎯' },
    { path: '/concierge', label: 'Concierge', icon: '🌟' },
  ]

  const communityLinks = [
    { path: '/gig-driver', label: 'Gig Driver Program', icon: '💼' },
    { path: '/reputation', label: 'Driver Reputation', icon: '⭐' },
  ]

  const dashboardLinks = []
  if (isCustomer) {
    dashboardLinks.push({ path: '/customer', label: 'Customer Dashboard', icon: '👤' })
  }
  if (isHost) {
    dashboardLinks.push({ path: '/host', label: 'Host Dashboard', icon: '�' })
  }
  if (isFleetOwner) {
    dashboardLinks.push({ path: '/fleet', label: 'Fleet Dashboard', icon: '🚚' })
    dashboardLinks.push({ path: '/fleet-management', label: 'Fleet Management', icon: '📊' })
  }
  if (isSupportAgent) {
    dashboardLinks.push({ path: '/support', label: 'Support Dashboard', icon: '🎧' })
  }
  if (isClaimsManager) {
    dashboardLinks.push({ path: '/claims', label: 'Claims Dashboard', icon: '�️' })
  }
  if (isSuperAdmin) {
    dashboardLinks.push({ path: '/admin', label: 'Admin Panel', icon: '🔧' })
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌴</span>
            <span className="text-xl font-bold text-primary-600">Sunshine Wheels</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu label="Vehicles" items={vehicleLinks} pathname={location.pathname} />
            <DropdownMenu label="Travel" items={travelLinks} pathname={location.pathname} />
            <DropdownMenu label="Community" items={communityLinks} pathname={location.pathname} />
            {dashboardLinks.length > 0 && <DropdownMenu label="Dashboard" items={dashboardLinks} pathname={location.pathname} />}

            <div className="ml-4 flex items-center space-x-2">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full" />
                    <span className="text-gray-700 font-medium hidden lg:inline">{currentUser.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded uppercase font-semibold ${
                      isSuperAdmin ? 'bg-purple-100 text-purple-700' :
                      isHost ? 'bg-blue-100 text-blue-700' :
                      isFleetOwner ? 'bg-emerald-100 text-emerald-700' :
                      isSupportAgent ? 'bg-orange-100 text-orange-700' :
                      isClaimsManager ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{currentUser.role === 'SUPER_ADMIN' ? 'Admin' : 
                      currentUser.role === 'HOST' ? 'Host' :
                      currentUser.role === 'FLEET_OWNER' ? 'Fleet' :
                      currentUser.role === 'SUPPORT_AGENT' ? 'Support' :
                      currentUser.role === 'CLAIMS_MANAGER' ? 'Claims' : 'Renter'}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-1">Main</p>
            <Link to="/" onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === '/' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>Home</Link>
            <Link to="/cars" onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === '/cars' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>🚗 Browse Cars</Link>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">Vehicles</p>
            {vehicleLinks.filter(l => l.path !== '/cars').map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>{link.icon} {link.label}</Link>
            ))}

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">Travel</p>
            {travelLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>{link.icon} {link.label}</Link>
            ))}

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">Community</p>
            {communityLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>{link.icon} {link.label}</Link>
            ))}

            {dashboardLinks.length > 0 && (
              <>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">Dashboard</p>
                {dashboardLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>{link.icon} {link.label}</Link>
                ))}
              </>
            )}

            <div className="pt-3 border-t space-y-2 mt-3">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full" />
                    <span className="text-sm text-gray-700 font-medium">{currentUser.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded uppercase font-semibold ${
                      isSuperAdmin ? 'bg-purple-100 text-purple-700' :
                      isHost ? 'bg-blue-100 text-blue-700' :
                      isFleetOwner ? 'bg-emerald-100 text-emerald-700' :
                      isSupportAgent ? 'bg-orange-100 text-orange-700' :
                      isClaimsManager ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{currentUser.role === 'SUPER_ADMIN' ? 'Admin' : 
                      currentUser.role === 'HOST' ? 'Host' :
                      currentUser.role === 'FLEET_OWNER' ? 'Fleet' :
                      currentUser.role === 'SUPPORT_AGENT' ? 'Support' :
                      currentUser.role === 'CLAIMS_MANAGER' ? 'Claims' : 'Renter'}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Log In</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
