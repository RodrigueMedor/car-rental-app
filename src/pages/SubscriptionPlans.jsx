import { useState } from 'react'
import { subscriptions } from '../data/subscriptions'
import { subscribeUser } from '../services/subscriptionService'
import { useAuth } from '../context/AuthContext'

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  green: 'from-emerald-500 to-teal-700',
  purple: 'from-purple-500 to-indigo-700',
}

const badgeMap = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
}

export default function SubscriptionPlans() {
  const { currentUser } = useAuth()
  const [selected, setSelected] = useState(null)
  const [success, setSuccess] = useState('')

  const handleSubscribe = async (planId) => {
    const res = await subscribeUser(currentUser?.id || 0, planId)
    if (res.success) {
      setSuccess(`Successfully subscribed to ${subscriptions.find((s) => s.id === planId)?.name}!`)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">⭐</span>
          <h1 className="text-4xl font-bold mb-3">Subscription Plans</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">Unlock premium benefits with flexible monthly subscriptions. Save on every booking and enjoy exclusive perks.</p>
        </div>
      </div>

      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-green-700 font-medium">{success}</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptions.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all ${selected === plan.id ? 'border-primary-500 scale-105' : 'border-gray-200 hover:shadow-lg'}`} onClick={() => setSelected(plan.id)}>
              <div className={`bg-gradient-to-r ${colorMap[plan.color]} p-6 text-white text-center`}>
                <p className="text-4xl font-bold">${plan.monthlyPrice}</p>
                <p className="text-sm opacity-80">per month</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{plan.name}</h3>
                <p className="text-center text-sm text-gray-500 mb-4">{plan.swaps} vehicle {plan.swaps === 1 ? 'swap' : 'swaps'} per month</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.discount > 0 && (
                  <div className="text-center mb-4">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badgeMap[plan.color]}`}>Save {plan.discount}% on bookings</span>
                  </div>
                )}
                <button onClick={() => handleSubscribe(plan.id)} className={`w-full py-3 rounded-lg font-semibold text-white transition-colors bg-gradient-to-r ${colorMap[plan.color]} hover:opacity-90`}>
                  {currentUser ? 'Subscribe Now' : 'Sign Up to Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div><p className="font-medium text-gray-900 mb-1">Can I switch plans?</p><p className="text-gray-500">Yes, you can upgrade or downgrade your plan at any time. Changes take effect next billing cycle.</p></div>
              <div><p className="font-medium text-gray-900 mb-1">What happens to unused vehicle swaps?</p><p className="text-gray-500">Unused swaps expire at the end of each month. You can carry over up to 2 swaps with the Business plan.</p></div>
              <div><p className="font-medium text-gray-900 mb-1">Is there a cancellation fee?</p><p className="text-gray-500">No cancellation fees. You can cancel anytime. Your benefits remain active until the end of the billing period.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
