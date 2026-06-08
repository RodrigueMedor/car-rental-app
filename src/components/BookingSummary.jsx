export default function BookingSummary({ car, pickupDate, returnDate, addons, addonPrices, onSubmit }) {
  if (!car) return null

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
    : 1

  const rentalCost = car.pricePerDay * days
  const addonTotal = Object.entries(addons || {})
    .filter(([, selected]) => selected)
    .reduce((sum, [key]) => sum + (addonPrices[key] || 0), 0)

  const total = rentalCost + addonTotal
  const serviceFee = Math.round(total * 0.1)
  const grandTotal = total + serviceFee

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-lg font-semibold text-gray-900">
          {car.year} {car.make} {car.model}
        </p>
        <p className="text-sm text-gray-500">{car.location}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">${car.pricePerDay} × {days} {days === 1 ? 'day' : 'days'}</span>
          <span className="text-gray-900 font-medium">${rentalCost}</span>
        </div>

        {Object.entries(addons || {})
          .filter(([, selected]) => selected)
          .map(([key]) => (
            <div key={key} className="flex justify-between text-gray-600">
              <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</span>
              <span>${addonPrices[key] || 0}</span>
            </div>
          ))}

        <div className="flex justify-between text-gray-600">
          <span>Service fee</span>
          <span>${serviceFee}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${grandTotal}</span>
        </div>
      </div>

      <button
        type={onSubmit ? 'button' : 'submit'}
        onClick={onSubmit}
        className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
      >
        Confirm Booking
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">You won't be charged yet</p>
    </div>
  )
}
