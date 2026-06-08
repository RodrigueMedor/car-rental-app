import { useState } from 'react'
import { cars } from '../data/mockData'

export default function AutoSales() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [showFinancing, setShowFinancing] = useState(false)
  const [financingAmount, setFinancingAmount] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [term, setTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(5.99)

  const forSaleCars = cars.filter(car => car.rentToOwn || car.id % 3 === 0)

  const calculateMonthlyPayment = () => {
    if (financingAmount <= 0 || downPayment >= financingAmount) return 0
    const principal = financingAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    return Math.round(payment)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🚗</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Auto Sales Marketplace</h1>
          <p className="text-gray-600 text-lg">Rent to own or purchase vehicles directly from our marketplace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forSaleCars.map(car => (
            <div key={car.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{car.year} {car.make} {car.model}</h3>
                  {car.rentToOwn && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      Rent to Own
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{car.type} • {car.seats} seats • {car.location}</p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rental Rate</span>
                    <span className="font-medium">${car.pricePerDay}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Purchase Price</span>
                    <span className="font-medium">${Math.round(car.pricePerDay * 150)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCar(car)
                      setFinancingAmount(Math.round(car.pricePerDay * 150))
                    }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors"
                  >
                    Test Drive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCar && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h2>
                  <button
                    onClick={() => {
                      setSelectedCar(null)
                      setShowFinancing(false)
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <img src={selectedCar.images[0]} alt="" className="w-full h-64 object-cover rounded-xl mb-6" />

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Vehicle Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Type</span><p className="font-medium">{selectedCar.type}</p></div>
                    <div><span className="text-gray-500">Seats</span><p className="font-medium">{selectedCar.seats}</p></div>
                    <div><span className="text-gray-500">Transmission</span><p className="font-medium">{selectedCar.transmission}</p></div>
                    <div><span className="text-gray-500">Fuel</span><p className="font-medium">{selectedCar.fuelType}</p></div>
                    <div><span className="text-gray-500">Location</span><p className="font-medium">{selectedCar.location}</p></div>
                    <div><span className="text-gray-500">Rating</span><p className="font-medium">⭐ {selectedCar.rating}</p></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-red-800">Purchase Price</p>
                      <p className="text-3xl font-bold text-red-900">${financingAmount}</p>
                    </div>
                    {selectedCar.rentToOwn && (
                      <div className="text-right">
                        <p className="text-sm text-red-600">Rent to Own Available</p>
                        <p className="text-lg font-bold text-red-700">${selectedCar.pricePerDay}/day</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowFinancing(!showFinancing)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    {showFinancing ? 'Hide Financing Calculator' : 'Calculate Financing'}
                  </button>
                </div>

                {showFinancing && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Financing Calculator</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price</label>
                        <input
                          type="number"
                          value={financingAmount}
                          onChange={(e) => setFinancingAmount(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term: {term} months</label>
                        <input
                          type="range"
                          min="12"
                          max="84"
                          step="12"
                          value={term}
                          onChange={(e) => setTerm(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate: {interestRate}%</label>
                        <input
                          type="range"
                          min="0"
                          max="15"
                          step="0.01"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-blue-800">Estimated Monthly Payment</p>
                          <p className="text-3xl font-bold text-blue-900">${calculateMonthlyPayment()}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>Amount Financed: ${financingAmount - downPayment}</p>
                          <p>Total Interest: ${Math.round((calculateMonthlyPayment() * term) - (financingAmount - downPayment))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors">
                    Submit Purchase Request
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-colors">
                    Schedule Test Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
