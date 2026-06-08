import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/mockData'

export default function SearchBar({ compact }) {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (pickup) params.set('pickup', pickup)
    if (returnDate) params.set('return', returnDate)
    navigate(`/cars?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className={`${compact ? '' : 'w-full max-w-5xl mx-auto'}`}>
      <div className={`bg-white rounded-2xl shadow-xl ${compact ? 'p-3' : 'p-4 sm:p-6'}`}>
        <div className={`grid gap-3 ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          <div className={compact ? '' : 'lg:col-span-1'}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className={compact ? '' : 'lg:col-span-1'}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Date</label>
            <input
              type="date"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
            />
          </div>
          <div className={compact ? '' : 'lg:col-span-1'}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
            />
          </div>
          <div className={`${compact ? 'col-span-2 sm:col-span-1' : 'lg:col-span-1 flex items-end'}`}>
            <button
              type="submit"
              className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors ${
                compact ? 'py-2.5 text-sm' : 'py-2.5 text-base'
              }`}
            >
              Search Cars
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
