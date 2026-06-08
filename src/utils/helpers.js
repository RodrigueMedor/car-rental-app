export function formatCurrency(amount) {
  return `$${amount.toLocaleString()}`
}

export function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 1
  return Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))
}

export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function mockDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function calculateRentToOwn(carPrice, weeklyPayment) {
  const totalPayments = Math.ceil(carPrice / weeklyPayment)
  const months = Math.ceil(totalPayments / 4)
  return { totalPayments, months, downPayment: Math.round(carPrice * 0.1), weekly: weeklyPayment }
}
