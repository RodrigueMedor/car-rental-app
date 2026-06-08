import { useMemo, useState } from 'react'
import { cars } from '../data/cars'
import { rentToOwnTerms } from '../data/rentToOwn'

export default function RentToOwn() {
  const [selectedCar, setSelectedCar] = useState(null)
  const eligibleCars = useMemo(() => {
    return cars.filter((c) => c.rentToOwn).map((car) => {
      const terms = rentToOwnTerms.find((t) => t.carId === car.id)
      return { ...car, terms }
    }).filter((c) => c.terms)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">🏠</span>
          <h1 className="text-4xl font-bold mb-3">Rent-to-Own Program</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">Drive today, own tomorrow. Apply your weekly rental payments toward vehicle ownership with our flexible rent-to-own plans.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligible Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eligibleCars.map((car) => (
                <div key={car.id} className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all cursor-pointer ${selectedCar?.id === car.id ? 'border-primary-500' : 'border-gray-100 hover:shadow-lg'}`} onClick={() => setSelectedCar(car)}>
                  <div className="h-40 overflow-hidden">
                    <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{car.year} {car.make} {car.model}</h3>
                    <p className="text-sm text-gray-500 mb-3">{car.location} · {car.type}</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <p className="text-emerald-700 font-bold">${car.terms.weeklyPayment}</p>
                        <p className="text-xs text-gray-500">/week</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-blue-700 font-bold">${car.terms.carPrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Full price</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <p className="text-purple-700 font-bold">{car.terms.termMonths}mo</p>
                        <p className="text-xs text-gray-500">Term</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">↓ {(car.terms.carPrice * 0.1).toLocaleString()} down payment</span>
                      <button className="text-sm font-semibold text-primary-600 hover:text-primary-800">Learn more →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                  <div><p className="font-medium text-gray-900">Choose Your Vehicle</p><p className="text-gray-500">Browse eligible vehicles and pick your dream car.</p></div>
                </div>
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                  <div><p className="font-medium text-gray-900">Drive & Pay Weekly</p><p className="text-gray-500">Make affordable weekly payments while you drive.</p></div>
                </div>
                <div className="flex gap-3">
                  <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                  <div><p className="font-medium text-gray-900">Own It</p><p className="text-gray-500">After your payment term, the vehicle is yours!</p></div>
                </div>
              </div>
              {selectedCar && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Payment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Vehicle</span><span className="font-medium">{selectedCar.year} {selectedCar.make} {selectedCar.model}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Full Price</span><span className="font-medium">${selectedCar.terms.carPrice.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Down Payment (10%)</span><span className="font-medium">${(selectedCar.terms.carPrice * 0.1).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Weekly Payment</span><span className="font-bold text-emerald-600">${selectedCar.terms.weeklyPayment}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Term</span><span className="font-medium">{selectedCar.terms.termMonths} months</span></div>
                    <div className="flex justify-between border-t pt-2"><span className="text-gray-600">Total paid</span><span className="font-bold">${(selectedCar.terms.weeklyPayment * selectedCar.terms.termMonths * 4).toLocaleString()}</span></div>
                  </div>
                  <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors">Apply Now</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
