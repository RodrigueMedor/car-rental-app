import { useState } from 'react'
import { gigPlans, gigEarningsSample } from '../data/gigDrivers'

export default function GigDriver() {
  const [hours, setHours] = useState(40)
  const [rate, setRate] = useState(25)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const estimatedEarnings = hours * rate
  const netEarnings = selectedPlan ? estimatedEarnings - (selectedPlan.weeklyPrice / 7 * hours / 8) : estimatedEarnings

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">🚀</span>
          <h1 className="text-4xl font-bold mb-3">Gig Driver Program</h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">Designed for Uber, Lyft, DoorDash, and delivery drivers. Unlimited mileage, weekly rentals, and flexible terms.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Rental Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gigPlans.map((plan) => (
                <div key={plan.id} className={`bg-white rounded-xl border-2 p-6 transition-all cursor-pointer ${selectedPlan?.id === plan.id ? 'border-orange-500 shadow-lg' : 'border-gray-100 hover:shadow-md'}`} onClick={() => setSelectedPlan(plan)}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900">{plan.name}</h3>
                    <span className="text-2xl font-bold text-orange-600">${plan.weeklyPrice}<span className="text-sm text-gray-400 font-normal">/wk</span></span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{plan.idealFor}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {plan.vehicleTypes.map((v, i) => <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">{v}</span>)}
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {plan.features.map((f, i) => <li key={i} className="flex items-start gap-2 text-gray-600"><span className="text-green-500 mt-0.5">✓</span>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Earnings Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours per week</label>
                  <input type="range" min={10} max={80} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-orange-500" />
                  <span className="text-sm font-medium text-gray-900">{hours} hrs</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly rate ($)</label>
                  <input type="range" min={10} max={50} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-orange-500" />
                  <span className="text-sm font-medium text-gray-900">${rate}/hr</span>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Estimated Weekly Earnings</p>
                  <p className="text-3xl font-bold text-orange-600">${estimatedEarnings.toLocaleString()}</p>
                  {selectedPlan && (
                    <p className="text-xs text-gray-500 mt-1">After rental: <span className="font-medium text-green-600">${netEarnings.toLocaleString()}</span></p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Top Earners This Week</h4>
                <div className="space-y-2 text-sm">
                  {gigEarningsSample.topEarners.map((e, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div><span className="font-medium text-gray-900">{e.name}</span><span className="text-gray-400 ml-2">{e.platform}</span></div>
                      <span className="font-bold text-green-600">${e.weekly}/wk</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to start earning?</h3>
          <p className="text-orange-100 mb-6">Get your vehicle today and hit the road. No long-term commitment required.</p>
          <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">Get Started</button>
        </div>
      </div>
    </div>
  )
}
