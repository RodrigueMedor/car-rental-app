import { useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import BookingSummary from '../components/BookingSummary'
import { useAuth } from '../context/AuthContext'
import { createBooking } from '../services/bookingService'
import { updateVehicle } from '../services/vehicleService'
import { calculateDays } from '../utils/helpers'
import { cars, services } from '../data/mockData'

const addonPrices = {
  airportDelivery: 35, childSeat: 25, gps: 15, concierge: 50, vacationPackage: 120,
  terminalPickup: 20, meetAndGreet: 30, luggageAssistance: 25, vipDelivery: 60,
  familyChildSeat: 25, familyStroller: 20, familyCooler: 15, familyWifi: 18, familyCharger: 10,
}

const addonOptions = [
  { key: 'airportDelivery', label: 'Airport Delivery', desc: 'Car delivered to your terminal', price: 35, icon: '✈️', group: 'standard' },
  { key: 'childSeat', label: 'Child Safety Seat', desc: 'Professionally installed child seat', price: 25, icon: '👶', group: 'standard' },
  { key: 'gps', label: 'GPS Navigation', desc: 'Premium GPS with live traffic', price: 15, icon: '🗺️', group: 'standard' },
  { key: 'concierge', label: 'Concierge Service', desc: 'Personal concierge for bookings & tips', price: 50, icon: '🌟', group: 'standard' },
  { key: 'vacationPackage', label: 'Vacation Package', desc: 'Full itinerary + theme park tickets', price: 120, icon: '🎉', group: 'standard' },
]

const airportOptions = [
  { key: 'terminalPickup', label: 'Terminal Pickup', desc: 'Car waiting at arrivals gate', price: 20, icon: '🛬' },
  { key: 'meetAndGreet', label: 'Meet & Greet', desc: 'Personal greeter with name sign at terminal', price: 30, icon: '👋' },
  { key: 'luggageAssistance', label: 'Luggage Assistance', desc: 'Help with luggage to the car', price: 25, icon: '🧳' },
  { key: 'vipDelivery', label: 'VIP Delivery', desc: 'Premium vehicle delivery with champagne', price: 60, icon: '🥂' },
]

const familyOptions = [
  { key: 'familyChildSeat', label: 'Child Seat (x2)', desc: 'Two professional child seats installed', price: 25, icon: '👶' },
  { key: 'familyStroller', label: 'Stroller', desc: 'Lightweight stroller for the trip', price: 20, icon: '👶' },
  { key: 'familyCooler', label: 'Cooler', desc: 'Insulated cooler with ice packs', price: 15, icon: '🧊' },
  { key: 'familyWifi', label: 'Portable WiFi', desc: 'Unlimited 4G/5G hotspot device', price: 18, icon: '📶' },
  { key: 'familyCharger', label: 'Charger Kit', desc: 'Multi-device charging kit with cables', price: 10, icon: '🔋' },
]

export default function Booking() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { currentUser } = useAuth()

  const car = useMemo(() => cars.find((c) => c.id === Number(id)), [id])

  const [form, setForm] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ').slice(1).join(' ') || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    pickupLocation: car?.location || '',
    returnLocation: car?.location || '',
    pickupDate: searchParams.get('pickup') || '',
    returnDate: searchParams.get('return') || '',
    specialRequests: '',
  })

  const [addons, setAddons] = useState({
    airportDelivery: false, childSeat: false, gps: false, concierge: false, vacationPackage: false,
    terminalPickup: false, meetAndGreet: false, luggageAssistance: false, vipDelivery: false,
    familyChildSeat: false, familyStroller: false, familyCooler: false, familyWifi: false, familyCharger: false,
  })

  const [confirmed, setConfirmed] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car not found</h2>
          <Link to="/cars" className="text-primary-600">Browse cars</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBookingError('')
    setSubmitting(true)
    try {
      const selectedAddons = Object.entries(addons).filter(([, v]) => v).map(([key]) => key)
      const days = calculateDays(form.pickupDate, form.returnDate)
      const rental = car.pricePerDay * days
      const addonTotal = selectedAddons.reduce((sum, key) => sum + (addonPrices[key] || 0), 0)
      const subtotal = rental + addonTotal
      const serviceFee = Math.round(subtotal * 0.1)
      const totalPrice = subtotal + serviceFee

      await createBooking({
        carId: car.id,
        userId: currentUser?.id || 0,
        guestName: `${form.firstName} ${form.lastName}`,
        guestEmail: form.email,
        guestPhone: form.phone,
        startDate: form.pickupDate,
        endDate: form.returnDate,
        status: 'pending',
        totalPrice,
        addons: selectedAddons,
        pickupLocation: form.pickupLocation,
        returnLocation: form.returnLocation,
        specialRequests: form.specialRequests,
      })
      await updateVehicle(car.id, { available: false })
      setConfirmed(true)
    } catch {
      setBookingError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg max-w-md">
          <span className="text-6xl block mb-6">🎉</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-2">
            Your {car.year} {car.make} {car.model} is reserved.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {form.firstName} {form.lastName} — confirmation sent to {form.email}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg">Back to Home</Link>
            <Link to="/cars" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg">Browse More</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Link to={`/cars/${car.id}`} className="text-sm text-gray-500 hover:text-primary-600">
            ← Back to car details
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pickup & Return</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                    <input
                      type="date"
                      value={form.pickupDate}
                      onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Date *</label>
                    <input
                      type="date"
                      value={form.returnDate}
                      onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                    <input
                      type="text"
                      value={form.pickupLocation}
                      onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Location</label>
                    <input
                      type="text"
                      value={form.returnLocation}
                      onChange={(e) => setForm({ ...form, returnLocation: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    placeholder="Any special requirements?"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Add-on Services</h2>

                {addonOptions.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Standard Add-ons</h3>
                    <div className="space-y-2 mb-6">
                      {addonOptions.map((option) => (
                        <label key={option.key} className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${addons[option.key] ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input type="checkbox" checked={addons[option.key]} onChange={(e) => setAddons({ ...addons, [option.key]: e.target.checked })} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                          <span className="text-xl">{option.icon}</span>
                          <div className="flex-1"><p className="font-medium text-gray-900 text-sm">{option.label}</p><p className="text-xs text-gray-500">{option.desc}</p></div>
                          <span className="font-semibold text-gray-900 text-sm">${option.price}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                <h3 className="text-sm font-semibold text-gray-600 mb-3">🛎️ Airport Concierge</h3>
                <div className="space-y-2 mb-6">
                  {airportOptions.map((option) => (
                    <label key={option.key} className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${addons[option.key] ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="checkbox" checked={addons[option.key]} onChange={(e) => setAddons({ ...addons, [option.key]: e.target.checked })} className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500" />
                      <span className="text-xl">{option.icon}</span>
                      <div className="flex-1"><p className="font-medium text-gray-900 text-sm">{option.label}</p><p className="text-xs text-gray-500">{option.desc}</p></div>
                      <span className="font-semibold text-gray-900 text-sm">${option.price}</span>
                    </label>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-gray-600 mb-3">👨‍👩‍👧‍👦 Family Travel Package</h3>
                <div className="space-y-2">
                  {familyOptions.map((option) => (
                    <label key={option.key} className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${addons[option.key] ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="checkbox" checked={addons[option.key]} onChange={(e) => setAddons({ ...addons, [option.key]: e.target.checked })} className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span className="text-xl">{option.icon}</span>
                      <div className="flex-1"><p className="font-medium text-gray-900 text-sm">{option.label}</p><p className="text-xs text-gray-500">{option.desc}</p></div>
                      <span className="font-semibold text-gray-900 text-sm">${option.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {!currentUser && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <span className="font-semibold">🔓 Continuing as guest.</span>{' '}
                  Want to track your bookings?{' '}
                  <Link to="/signup" className="text-amber-700 underline font-medium">Sign up</Link> or{' '}
                  <Link to="/login" className="text-amber-700 underline font-medium">Log in</Link>.
                </div>
              )}

              {bookingError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{bookingError}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg lg:hidden"
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>

            <div className="lg:col-span-1">
              <BookingSummary
                car={car}
                pickupDate={form.pickupDate}
                returnDate={form.returnDate}
                addons={addons}
                addonPrices={addonPrices}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={bookingError}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
