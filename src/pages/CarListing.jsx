import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import SearchBar from '../components/SearchBar'
import { cars, carTypes, locations } from '../data/mockData'

export default function CarListing() {
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    carType: 'All',
    minPrice: '',
    maxPrice: '',
    seats: '',
    sortBy: 'recommended',
  })

  useEffect(() => {
    const loc = searchParams.get('location')
    if (loc) {
      setFilters((prev) => ({ ...prev, location: loc }))
    }
  }, [searchParams])

  const filteredCars = useMemo(() => {
    let result = [...cars]

    if (filters.location) {
      result = result.filter((c) =>
        c.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    if (filters.carType !== 'All') {
      result = result.filter((c) => c.type === filters.carType)
    }
    if (filters.minPrice) {
      result = result.filter((c) => c.pricePerDay >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter((c) => c.pricePerDay <= Number(filters.maxPrice))
    }
    if (filters.seats) {
      result = result.filter((c) => c.seats >= Number(filters.seats))
    }

    switch (filters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'priceDesc':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Cars</h1>
          <SearchBar compact />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Car Type</label>
                  <select
                    value={filters.carType}
                    onChange={(e) => handleFilterChange('carType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                  >
                    {carTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                    </select>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                  >
                    <option value="">All Types</option>
                    <option value="Passenger">Passenger Vehicles</option>
                    <option value="Cargo">Cargo & Utility</option>
                    <option value="Family">Family Vehicles</option>
                    <option value="Luxury">Luxury Vehicles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Seats</label>
                  <select
                    value={filters.seats}
                    onChange={(e) => handleFilterChange('seats', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                  >
                    <option value="">Any</option>
                    <option value="2">2+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="7">7+</option>
                    <option value="8">8+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ location: searchParams.get('location') || '', carType: 'All', category: '', minPrice: '', maxPrice: '', seats: '', sortBy: 'recommended' })}
                  className="w-full text-sm text-primary-600 hover:text-primary-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">{filteredCars.length} cars found</p>
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
