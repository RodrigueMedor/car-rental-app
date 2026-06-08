import { useMemo } from 'react'
import { users } from '../data/users'
import { useAuth } from '../context/AuthContext'

const badgeIcons = {
  'Trust Badge': '🛡️',
  'Safe Driver Badge': '✅',
  'Premium Member Badge': '⭐',
  'Top Host Badge': '🏆',
}

const badgeColors = {
  'Trust Badge': 'bg-blue-50 text-blue-700 border-blue-200',
  'Safe Driver Badge': 'bg-green-50 text-green-700 border-green-200',
  'Premium Member Badge': 'bg-purple-50 text-purple-700 border-purple-200',
  'Top Host Badge': 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function DriverReputation() {
  const { currentUser } = useAuth()
  const user = currentUser || users[0]
  const allDrivers = useMemo(() => users.filter((u) => u.role !== 'admin').sort((a, b) => (b.driverScore || 0) - (a.driverScore || 0)), [])

  const scoreColor = user.driverScore >= 4.8 ? 'text-green-600' : user.driverScore >= 4.0 ? 'text-blue-600' : user.driverScore >= 3.0 ? 'text-yellow-600' : 'text-red-600'
  const scoreBg = user.driverScore >= 4.8 ? 'bg-green-50' : user.driverScore >= 4.0 ? 'bg-blue-50' : user.driverScore >= 3.0 ? 'bg-yellow-50' : 'bg-red-50'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">🏅</span>
          <h1 className="text-4xl font-bold mb-3">Driver Reputation</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">Track your driver score, earn trust badges, and build your reputation in the Sunshine Wheels community.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24 text-center">
              <img src={user.avatar} alt="" className="w-20 h-20 rounded-full mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              <div className={`mt-4 ${scoreBg} rounded-xl p-4`}>
                <p className="text-sm text-gray-600">Driver Score</p>
                <p className={`text-4xl font-bold ${scoreColor}`}>{user.driverScore?.toFixed(1) || 'N/A'}</p>
                <p className="text-xs text-gray-400 mt-1">out of 5.0</p>
              </div>
              <div className="mt-4 space-y-2">
                {(user.badges || []).map((badge) => (
                  <div key={badge} className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${badgeColors[badge] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                    <span className="text-lg">{badgeIcons[badge] || '🏅'}</span>
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Rankings</h2>
            <div className="space-y-3">
              {allDrivers.map((driver, idx) => (
                <div key={driver.id} className={`bg-white rounded-xl p-4 border ${driver.id === user.id ? 'border-primary-500 bg-primary-50' : 'border-gray-100'} flex items-center gap-4`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    {idx + 1}
                  </span>
                  <img src={driver.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{driver.name} {driver.id === user.id && <span className="text-xs text-primary-600">(you)</span>}</p>
                    <p className="text-xs text-gray-400 capitalize">{driver.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {(driver.badges || []).slice(0, 2).map((b) => (
                      <span key={b} className="text-sm" title={b}>{badgeIcons[b] || '🏅'}</span>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{driver.driverScore?.toFixed(1)}</p>
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${driver.driverScore >= 4.5 ? 'bg-green-500' : driver.driverScore >= 4.0 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: `${(driver.driverScore / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How to Improve Your Score</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div><p className="font-medium text-gray-900">Complete bookings</p><p className="text-gray-500">Every completed booking adds to your score.</p></div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">⭐</span>
                  <div><p className="font-medium text-gray-900">Get 5-star reviews</p><p className="text-gray-500">Positive reviews from hosts boost your score.</p></div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🕐</span>
                  <div><p className="font-medium text-gray-900">Be punctual</p><p className="text-gray-500">Return vehicles on time to maintain your score.</p></div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🤝</span>
                  <div><p className="font-medium text-gray-900">Communicate</p><p className="text-gray-500">Good communication with hosts earns trust points.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
