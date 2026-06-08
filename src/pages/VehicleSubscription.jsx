import { useState } from 'react'
import { subscriptions } from '../data/mockData'

export default function VehicleSubscription() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚗</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vehicle Subscription Program</h1>
          <p className="text-gray-600 text-lg">Netflix-style vehicle subscription with insurance, maintenance, and roadside assistance included</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {subscriptions.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                selectedPlan?.id === plan.id ? 'ring-4 ring-primary-500' : ''
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary-600">${plan.monthlyPrice}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPlan(plan)
                  setShowDetails(true)
                }}
                className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                  selectedPlan?.id === plan.id
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl block mb-2">🔄</span>
              <h3 className="font-semibold text-gray-900 mb-1">Vehicle Swaps</h3>
              <p className="text-sm text-gray-600">Swap vehicles based on your plan</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl block mb-2">🛡️</span>
              <h3 className="font-semibold text-gray-900 mb-1">Insurance Included</h3>
              <p className="text-sm text-gray-600">Full coverage insurance</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl block mb-2">🔧</span>
              <h3 className="font-semibold text-gray-900 mb-1">Maintenance</h3>
              <p className="text-sm text-gray-600">All maintenance covered</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl block mb-2">🚨</span>
              <h3 className="font-semibold text-gray-900 mb-1">Roadside Assistance</h3>
              <p className="text-sm text-gray-600">24/7 emergency support</p>
            </div>
          </div>
        </div>

        {showDetails && selectedPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-800">Monthly Price</p>
                      <p className="text-4xl font-bold text-emerald-900">${selectedPlan.monthlyPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600">Booking Discount</p>
                      <p className="text-2xl font-bold text-emerald-700">{selectedPlan.discount}% OFF</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Plan Features</h3>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🚗</span>
                      <span>Vehicle Rental</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🛡️</span>
                      <span>Insurance Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🔧</span>
                      <span>Maintenance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🚨</span>
                      <span>Roadside Assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🔄</span>
                      <span>{selectedPlan.swaps} Vehicle Swaps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">💰</span>
                      <span>{selectedPlan.discount}% Booking Discount</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                  Subscribe to {selectedPlan.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
