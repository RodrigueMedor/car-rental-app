import { hostEarnings } from '../data/bookings'
import { mockDelay } from '../utils/helpers'

export async function getHostAnalytics(hostId) {
  await mockDelay()
  const earnings = hostEarnings
  const totalEarnings = earnings.reduce((s, m) => s + m.earnings, 0)
  const totalBookings = earnings.reduce((s, m) => s + m.bookings, 0)
  const avgMonthly = Math.round(totalEarnings / earnings.length)
  const occupancyRate = 68 + Math.floor(Math.random() * 15)
  const forecast = Math.round(totalEarnings * 1.15)
  const popular = [
    { vehicle: 'Jeep Wrangler', bookings: 24, revenue: 6400 },
    { vehicle: 'Ford Mustang', bookings: 18, revenue: 5400 },
    { vehicle: 'Chevrolet Suburban', bookings: 12, revenue: 4500 },
  ]
  const suggestions = [
    'Increase price by $10/day for weekend bookings',
    'Add airport delivery option to attract travelers',
    'Consider monthly discount for long-term renters',
  ]
  return { data: { earnings, totalEarnings, totalBookings, avgMonthly, occupancyRate, forecast, popular, suggestions } }
}
