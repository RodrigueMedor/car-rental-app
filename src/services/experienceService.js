import { experiences } from '../data/experiences'
import { mockDelay } from '../utils/helpers'

export async function getExperiences(filters = {}) {
  await mockDelay()
  let result = [...experiences]
  if (filters.category) result = result.filter((e) => e.category === filters.category)
  if (filters.location) result = result.filter((e) => e.location.toLowerCase().includes(filters.location.toLowerCase()))
  return { data: result, total: result.length }
}

export async function getExperienceById(id) {
  await mockDelay()
  return { data: experiences.find((e) => e.id === Number(id)) || null }
}
