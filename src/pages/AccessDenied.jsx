import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AccessDenied() {
  const { currentUser } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          {currentUser 
            ? `You don't have permission to access this page. Your current role is: ${currentUser.role}`
            : 'You need to be logged in to access this page.'}
        </p>
        <div className="space-y-3">
          <Link to="/" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
            Return to Home
          </Link>
          <Link to="/login" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors">
            Login with Different Account
          </Link>
        </div>
      </div>
    </div>
  )
}
