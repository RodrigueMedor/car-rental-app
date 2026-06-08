import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/users'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: ROLES.CUSTOMER })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const result = signup(form.name, form.email, form.role)
    if (result.success) {
      navigate(result.role === ROLES.HOST ? '/host' : '/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-2">🌴</span>
          <h1 className="text-2xl font-bold text-gray-900">Join Sunshine Wheels</h1>
          <p className="text-gray-500 text-sm">Create your account and hit the road</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
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
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setForm({ ...form, role: ROLES.CUSTOMER })}
                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  form.role === ROLES.CUSTOMER
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}>
                <span className="block text-lg mb-1">🔑</span>
                Rent a Car
              </button>
              <button type="button" onClick={() => setForm({ ...form, role: ROLES.HOST })}
                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  form.role === ROLES.HOST
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}>
                <span className="block text-lg mb-1">🚗</span>
                List My Car
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:text-primary-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
