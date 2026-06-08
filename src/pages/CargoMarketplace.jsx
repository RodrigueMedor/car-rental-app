import { useState, useMemo } from 'react'
import { cars } from '../data/cars'
import CarCard from '../components/CarCard'

const cargoTypes = ['All', 'Pickup Truck', 'Cargo Van', 'Moving Truck', 'Utility Vehicle']
const cargoCategories = ['Cargo', 'Utility']

export default function CargoMarketplace() {
  const [filter, setFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = useMemo(() => {
    let result = cars.filter((c) => cargoCategories.includes(c.category) || ['Pickup Truck', 'Cargo Van', 'Moving Truck', 'Utility Vehicle'].includes(c.type))
    if (filter !== 'All') result = result.filter((c) => c.type === filter)
    if (categoryFilter) result = result.filter((c) => c.category === categoryFilter)
    return result.sort((a, b) => b.pricePerDay - a.pricePerDay)
  }, [filter, categoryFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">📦</span>
          <h1 className="text-4xl font-bold mb-3">Cargo & Truck Marketplace</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">Find pickup trucks, cargo vans, moving trucks, and utility vehicles for your hauling and delivery needs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {cargoTypes.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{t}</button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-500">Try adjusting your filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
