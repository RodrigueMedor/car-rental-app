export const bookings = [
  { id: 1, carId: 1, userId: 4, startDate: '2025-07-15', endDate: '2025-07-18', status: 'confirmed', totalPrice: 267, addons: ['childSeat', 'gps'], pickupLocation: 'Miami Beach, FL', returnLocation: 'Miami Beach, FL', createdAt: '2025-06-20' },
  { id: 2, carId: 4, userId: 5, startDate: '2025-08-01', endDate: '2025-08-07', status: 'pending', totalPrice: 770, addons: ['airportDelivery'], pickupLocation: 'Fort Lauderdale Airport', returnLocation: 'Fort Lauderdale Airport', createdAt: '2025-07-25' },
  { id: 3, carId: 7, userId: 7, startDate: '2025-09-10', endDate: '2025-09-14', status: 'confirmed', totalPrice: 720, addons: ['gps', 'concierge'], pickupLocation: 'Naples, FL', returnLocation: 'Naples, FL', createdAt: '2025-08-15' },
  { id: 4, carId: 2, userId: 4, startDate: '2025-10-05', endDate: '2025-10-08', status: 'completed', totalPrice: 360, addons: [], pickupLocation: 'Orlando, FL', returnLocation: 'Orlando, FL', createdAt: '2025-09-01' },
  { id: 5, carId: 3, userId: 5, startDate: '2025-11-20', endDate: '2025-11-25', status: 'completed', totalPrice: 450, addons: ['childSeat', 'vacationPackage'], pickupLocation: 'Tampa, FL', returnLocation: 'Tampa, FL', createdAt: '2025-11-01' },
  { id: 6, carId: 8, userId: 7, startDate: '2026-01-10', endDate: '2026-01-12', status: 'cancelled', totalPrice: 110, addons: [], pickupLocation: 'Miami Beach, FL', returnLocation: 'Miami Beach, FL', createdAt: '2025-12-20' },
  { id: 7, carId: 11, userId: 4, startDate: '2026-03-01', endDate: '2026-03-05', status: 'pending', totalPrice: 650, addons: ['airportDelivery', 'gps'], pickupLocation: 'Miami Airport', returnLocation: 'Miami, FL', createdAt: '2026-02-20' },
  { id: 8, carId: 6, userId: 5, startDate: '2026-04-10', endDate: '2026-04-17', status: 'confirmed', totalPrice: 665, addons: [], pickupLocation: 'Orlando, FL', returnLocation: 'Orlando, FL', createdAt: '2026-03-25' },
]
export const hostEarnings = [
  { month: 'Jan', earnings: 1200, bookings: 4 },
  { month: 'Feb', earnings: 1800, bookings: 6 },
  { month: 'Mar', earnings: 2400, bookings: 8 },
  { month: 'Apr', earnings: 1500, bookings: 5 },
  { month: 'May', earnings: 2100, bookings: 7 },
  { month: 'Jun', earnings: 3200, bookings: 11 },
  { month: 'Jul', earnings: 3800, bookings: 14 },
  { month: 'Aug', earnings: 4200, bookings: 16 },
  { month: 'Sep', earnings: 2800, bookings: 10 },
  { month: 'Oct', earnings: 2200, bookings: 8 },
  { month: 'Nov', earnings: 1900, bookings: 6 },
  { month: 'Dec', earnings: 5100, bookings: 19 },
]
