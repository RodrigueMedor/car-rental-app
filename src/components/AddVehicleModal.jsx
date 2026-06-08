import { useState } from 'react'
import { createVehicle } from '../services/vehicleService'

const carTypes = ['SUV', 'Sedan', 'Convertible', 'Minivan', 'Cargo Van', 'Luxury SUV', 'Pickup Truck', 'Moving Truck', 'Utility Vehicle']

export default function AddVehicleModal({ isOpen, onClose, hostId, hostName, onSuccess }) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    type: 'SUV',
    seats: 5,
    pricePerDay: '',
    location: '',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createVehicle({ ...form, hostId, hostName, year: Number(form.year), pricePerDay: Number(form.pricePerDay) })
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setForm({ make: '', model: '', year: '', type: 'SUV', seats: 5, pricePerDay: '', location: '', transmission: 'Automatic', fuelType: 'Gasoline' })
        if (onSuccess) onSuccess()
      }, 1500)
    } catch {
      setError('Failed to add vehicle. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add Vehicle</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vehicle Submitted!</h3>
              <p className="text-gray-500">Your vehicle is being reviewed and will be listed shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
                  <input type="text" value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required placeholder="e.g. Toyota" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input type="text" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required placeholder="e.g. Camry" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required placeholder="2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
                    {carTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats *</label>
                  <select value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
                    {[2, 4, 5, 7, 8].map((n) => <option key={n} value={n}>{n} seats</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price/Day *</label>
                  <input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required placeholder="$75" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required placeholder="Miami Beach, FL" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50">
                    <option>Gasoline</option>
                    <option>Electric</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                  List Vehicle
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
