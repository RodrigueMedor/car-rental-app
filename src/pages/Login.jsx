import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/users'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: ROLES.CUSTOMER })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(form.email, form.password, form.role)
    if (result.success) {
      const dashboardRoutes = {
        [ROLES.CUSTOMER]: '/customer',
        [ROLES.HOST]: '/host',
        [ROLES.FLEET_OWNER]: '/fleet',
        [ROLES.SUPPORT_AGENT]: '/support',
        [ROLES.CLAIMS_MANAGER]: '/claims',
        [ROLES.SUPER_ADMIN]: '/admin',
      }
      navigate(dashboardRoutes[form.role] || '/')
    } else {
      setError(result.error)
    }
  }

  const quickLogin = (email, role) => {
    setForm({ ...form, email, role })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-2">🌴</span>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Log in to your Sunshine Wheels account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white"
            >
              <option value={ROLES.CUSTOMER}>Customer (Renter)</option>
              <option value={ROLES.HOST}>Host (Vehicle Owner)</option>
              <option value={ROLES.FLEET_OWNER}>Fleet Owner</option>
              <option value={ROLES.SUPPORT_AGENT}>Support Agent</option>
              <option value={ROLES.CLAIMS_MANAGER}>Claims Manager</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Any password works"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-3">Quick Login (Simulated):</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => quickLogin('lisa@example.com', ROLES.CUSTOMER)} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors">
              👤 Customer
            </button>
            <button onClick={() => quickLogin('sarah@example.com', ROLES.HOST)} className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors">
              🚗 Host
            </button>
            <button onClick={() => quickLogin('mike@example.com', ROLES.FLEET_OWNER)} className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg transition-colors">
              🚚 Fleet Owner
            </button>
            <button onClick={() => quickLogin('anna@example.com', ROLES.SUPPORT_AGENT)} className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg transition-colors">
              🎧 Support Agent
            </button>
            <button onClick={() => quickLogin('john@example.com', ROLES.CLAIMS_MANAGER)} className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors">
              🛡️ Claims Manager
            </button>
            <button onClick={() => quickLogin('admin@sunshinewheels.com', ROLES.SUPER_ADMIN)} className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-colors">
              ⭐ Super Admin
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 font-medium hover:text-primary-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
