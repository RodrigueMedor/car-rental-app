import { subscriptions } from '../data/subscriptions'
import { mockDelay } from '../utils/helpers'

export async function getSubscriptions() {
  await mockDelay()
  return { data: subscriptions }
}

export async function getSubscriptionById(id) {
  await mockDelay()
  return { data: subscriptions.find((s) => s.id === id) || null }
}

export async function subscribeUser(userId, planId) {
  await mockDelay()
  return { success: true, message: `User ${userId} subscribed to ${planId} plan`, plan: planId }
}
