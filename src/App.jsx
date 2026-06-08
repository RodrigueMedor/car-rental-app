import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RoleProvider } from './context/RoleContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './data/users'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingChatWidget from './components/FloatingChatWidget'
import Home from './pages/Home'
import CarListing from './pages/CarListing'
import CarDetails from './pages/CarDetails'
import Booking from './pages/Booking'
import HostDashboard from './pages/HostDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import FleetDashboard from './pages/FleetDashboard'
import SupportDashboard from './pages/SupportDashboard'
import ClaimsDashboard from './pages/ClaimsDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Services from './pages/Services'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'
import TravelPlanner from './pages/TravelPlanner'
import RentToOwn from './pages/RentToOwn'
import SubscriptionPlans from './pages/SubscriptionPlans'
import GigDriver from './pages/GigDriver'
import CargoMarketplace from './pages/CargoMarketplace'
import DriverReputation from './pages/DriverReputation'
import VehicleInspection from './pages/VehicleInspection'
import Experiences from './pages/Experiences'
import Concierge from './pages/Concierge'
import VacationPackages from './pages/VacationPackages'
import AirportConcierge from './pages/AirportConcierge'
import DriverService from './pages/DriverService'
import VehicleSubscription from './pages/VehicleSubscription'
import DeliveryService from './pages/DeliveryService'
import TravelAddOns from './pages/TravelAddOns'
import AutoSales from './pages/AutoSales'
import FleetManagement from './pages/FleetManagement'
import CommercialVehicles from './pages/CommercialVehicles'
import MechanicMarketplace from './pages/MechanicMarketplace'
import RoadsideAssistanceMarketplace from './pages/RoadsideAssistanceMarketplace'
import VehicleTracking from './pages/VehicleTracking'

function Layout() {
  const { pathname } = useLocation()
  const isDashboard = pathname === '/admin' || pathname.startsWith('/admin/') || 
                      pathname === '/host' || pathname.startsWith('/host/') ||
                      pathname === '/customer' || pathname.startsWith('/customer/') ||
                      pathname === '/fleet' || pathname.startsWith('/fleet/') ||
                      pathname === '/support' || pathname.startsWith('/support/') ||
                      pathname === '/claims' || pathname.startsWith('/claims/') ||
                      pathname === '/fleet-management' || pathname.startsWith('/fleet-management/')

  if (isDashboard) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/host" element={<ProtectedRoute roles={[ROLES.HOST, ROLES.SUPER_ADMIN]}><HostDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={[ROLES.SUPER_ADMIN]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute roles={[ROLES.CUSTOMER, ROLES.SUPER_ADMIN]}><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/fleet" element={<ProtectedRoute roles={[ROLES.FLEET_OWNER, ROLES.SUPER_ADMIN]}><FleetDashboard /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute roles={[ROLES.SUPPORT_AGENT, ROLES.SUPER_ADMIN]}><SupportDashboard /></ProtectedRoute>} />
          <Route path="/claims" element={<ProtectedRoute roles={[ROLES.CLAIMS_MANAGER, ROLES.SUPER_ADMIN]}><ClaimsDashboard /></ProtectedRoute>} />
          <Route path="/fleet-management" element={<ProtectedRoute roles={[ROLES.FLEET_OWNER, ROLES.SUPER_ADMIN]}><FleetManagement /></ProtectedRoute>} />
        </Routes>
        <FloatingChatWidget />
      </main>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/travel-planner" element={<TravelPlanner />} />
          <Route path="/rent-to-own" element={<RentToOwn />} />
          <Route path="/subscriptions" element={<SubscriptionPlans />} />
          <Route path="/gig-driver" element={<GigDriver />} />
          <Route path="/cargo" element={<CargoMarketplace />} />
          <Route path="/reputation" element={<DriverReputation />} />
          <Route path="/inspection" element={<VehicleInspection />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/vacation-packages" element={<VacationPackages />} />
          <Route path="/airport-concierge" element={<AirportConcierge />} />
          <Route path="/driver-service" element={<DriverService />} />
          <Route path="/vehicle-subscription" element={<VehicleSubscription />} />
          <Route path="/delivery-service" element={<DeliveryService />} />
          <Route path="/travel-addons" element={<TravelAddOns />} />
          <Route path="/auto-sales" element={<AutoSales />} />
          <Route path="/commercial-vehicles" element={<CommercialVehicles />} />
          <Route path="/mechanic-marketplace" element={<MechanicMarketplace />} />
          <Route path="/roadside-assistance" element={<RoadsideAssistanceMarketplace />} />
          <Route path="/vehicle-tracking" element={<VehicleTracking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingChatWidget />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <Router>
          <Layout />
        </Router>
      </RoleProvider>
    </AuthProvider>
  )
}

export default App
