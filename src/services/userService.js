import { users } from '../data/users'
import { mockDelay, generateId } from '../utils/helpers'

export async function getUsers(filters = {}) {
  await mockDelay()
  let result = [...users]
  if (filters.role) result = result.filter((u) => u.role === filters.role)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }
  return { data: result, total: result.length }
}

export async function getUserById(id) {
  await mockDelay()
  return { data: users.find((u) => u.id === Number(id)) || null }
}

export async function createUser(userData) {
  await mockDelay()
  const newUser = { id: generateId(), ...userData, avatar: `https://i.pravatar.cc/150?u=${userData.email}` }
  users.push(newUser)
  return { data: newUser, success: true }
}

export async function getUserByEmail(email) {
  await mockDelay()
  return { data: users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null }
}
