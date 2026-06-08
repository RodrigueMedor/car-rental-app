import { destinations } from '../data/destinations'
import { cars } from '../data/cars'
import { services } from '../data/services'
import { mockDelay } from '../utils/helpers'

export async function getTravelRecommendations({ destination, travelers, budget, purpose }) {
  await mockDelay(500)
  const dest = destinations.find((d) => d.city.toLowerCase() === destination.toLowerCase())
  if (!dest) {
    return { data: null, error: 'Destination not found. Try Miami, Orlando, Key West, Tampa, Naples, or Fort Lauderdale.' }
  }
  const vehicleType = dest.recommendedCars[0] || 'SUV'
  const matchingCars = cars.filter((c) => c.type === vehicleType || dest.recommendedCars.includes(c.type))
  const bestVehicle = matchingCars.length > 0 ? matchingCars[0] : cars[0]
  const recommendedServices = services.filter((s) => s.price > 0 && s.price <= budget * 0.3).slice(0, 3)
  const dailyBudget = Math.round(budget / 7)
  const estimatedCost = Math.round(bestVehicle.pricePerDay * Math.min(travelers, 7) + recommendedServices.reduce((s, sv) => s + sv.price, 0))
  return {
    data: {
      destination: dest,
      bestVehicle: { ...bestVehicle, matchReason: `Perfect for ${purpose} trips in ${dest.city}. ${travelers > 4 ? 'Spacious enough for your group.' : 'Ideal size for your party.'}` },
      recommendedServices,
      estimatedCost,
      dailyBudget,
      attractions: dest.attractions.slice(0, 4),
      tip: travelers > 4 ? 'Consider a larger SUV or Minivan for extra comfort.' : 'A compact or mid-size car will be easy to park and fuel-efficient.',
    },
  }
}

export async function analyzeDamage(photos) {
  await mockDelay(800)
  const outcomes = ['No Damage', 'Minor Damage', 'Major Damage']
  const mockResult = {
    status: outcomes[Math.floor(Math.random() * 3)],
    confidence: Math.round(85 + Math.random() * 14),
    detectedIssues: [],
    analyzedAt: new Date().toISOString(),
  }
  if (mockResult.status === 'Minor Damage') {
    mockResult.detectedIssues = ['Light scratch detected on rear bumper (2cm)', 'Slight curb rash on front right rim']
  } else if (mockResult.status === 'Major Damage') {
    mockResult.detectedIssues = ['Deep scratch on driver side door', 'Dent on rear quarter panel (3cm)', 'Cracked tail light']
  }
  return { data: mockResult }
}
