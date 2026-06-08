import { cars } from '../data/cars'
import { mockDelay, generateId } from '../utils/helpers'

export async function getVehicles(filters = {}) {
  await mockDelay()
  let result = [...cars]
  if (filters.location) result = result.filter((c) => c.location.toLowerCase().includes(filters.location.toLowerCase()))
  if (filters.type && filters.type !== 'All') result = result.filter((c) => c.type === filters.type || c.category === filters.type)
  if (filters.minPrice) result = result.filter((c) => c.pricePerDay >= Number(filters.minPrice))
  if (filters.maxPrice) result = result.filter((c) => c.pricePerDay <= Number(filters.maxPrice))
  if (filters.seats) result = result.filter((c) => c.seats >= Number(filters.seats))
  if (filters.category) result = result.filter((c) => c.category === filters.category)
  if (filters.rentToOwn) result = result.filter((c) => c.rentToOwn)
  if (filters.eligibleForGig) result = result.filter((c) => ['Sedan', 'SUV', 'Cargo Van', 'Pickup Truck', 'Moving Truck'].includes(c.type))
  if (filters.sortBy === 'priceAsc') result.sort((a, b) => a.pricePerDay - b.pricePerDay)
  else if (filters.sortBy === 'priceDesc') result.sort((a, b) => b.pricePerDay - a.pricePerDay)
  else if (filters.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
  else result.sort((a, b) => b.rating - a.rating)
  return { data: result, total: result.length }
}

export async function getVehicleById(id) {
  await mockDelay()
  const vehicle = cars.find((c) => c.id === Number(id))
  return { data: vehicle || null }
}

export async function getVehiclesByCategory(category) {
  await mockDelay()
  const result = cars.filter((c) => c.category === category || c.type === category)
  return { data: result }
}

export async function getFeaturedVehicles() {
  await mockDelay()
  return { data: cars.filter((c) => c.rating >= 4.8).slice(0, 4) }
}

export async function getVehiclesByHostId(hostId) {
  await mockDelay()
  const result = cars.filter((c) => c.hostId === Number(hostId))
  return { data: result, total: result.length }
}

export async function createVehicle(vehicleData) {
  await mockDelay()
  const host = { name: vehicleData.hostName || 'Owner', rating: 5.0, trips: 0 }
  const newVehicle = {
    id: generateId(),
    ...vehicleData,
    host,
    images: vehicleData.images || ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80'],
    features: vehicleData.features || [],
    rating: 0,
    reviewCount: 0,
    available: true,
    mileage: 'Unlimited',
    lat: 25.7617,
    lng: -80.1918,
    category: vehicleData.category || 'Passenger',
    rentToOwn: vehicleData.rentToOwn || false,
  }
  delete newVehicle.hostName
  cars.unshift(newVehicle)
  return { data: newVehicle, success: true }
}

export async function updateVehicle(id, data) {
  await mockDelay()
  const index = cars.findIndex((c) => c.id === Number(id))
  if (index === -1) return { success: false, error: 'Vehicle not found' }
  cars[index] = { ...cars[index], ...data, id: cars[index].id }
  return { data: cars[index], success: true }
}

export async function deleteVehicle(id) {
  await mockDelay()
  const index = cars.findIndex((c) => c.id === Number(id))
  if (index === -1) return { success: false, error: 'Vehicle not found' }
  cars.splice(index, 1)
  return { success: true }
}
