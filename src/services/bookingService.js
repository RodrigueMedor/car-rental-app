import { bookings, hostEarnings } from '../data/bookings'
import { mockDelay, generateId } from '../utils/helpers'

export async function getBookings(filters = {}) {
  await mockDelay()
  let result = [...bookings]
  if (filters.userId) result = result.filter((b) => b.userId === filters.userId)
  if (filters.status) result = result.filter((b) => b.status === filters.status)
  if (filters.carId) result = result.filter((b) => b.carId === filters.carId)
  return { data: result, total: result.length }
}

export async function createBooking(bookingData) {
  await mockDelay()
  const newBooking = { id: generateId(), ...bookingData, createdAt: new Date().toISOString().split('T')[0] }
  bookings.unshift(newBooking)
  return { data: newBooking, success: true }
}

export async function cancelBooking(id) {
  await mockDelay()
  const booking = bookings.find((b) => b.id === id)
  if (booking) booking.status = 'cancelled'
  return { data: booking, success: true }
}

export async function updateBookingStatus(id, status) {
  await mockDelay()
  const booking = bookings.find((b) => b.id === id)
  if (booking) booking.status = status
  return { data: booking, success: true }
}

export async function getHostEarnings(hostId) {
  await mockDelay()
  return { data: hostEarnings }
}

export function calculateBookingPrice(car, days, addons, addonPrices) {
  const rental = car.pricePerDay * days
  const addonTotal = Object.entries(addons || {})
    .filter(([, selected]) => selected)
    .reduce((sum, [key]) => sum + (addonPrices[key] || 0), 0)
  const subtotal = rental + addonTotal
  const serviceFee = Math.round(subtotal * 0.1)
  return { rental, addonTotal, serviceFee, total: subtotal + serviceFee }
}
