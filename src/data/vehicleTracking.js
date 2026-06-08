export const vehicleLocations = [
  {
    id: 1,
    carId: 1,
    bookingId: 1,
    currentLocation: { lat: 28.5383, lng: -81.3792 }, // Orlando
    status: 'in_use',
    lastUpdate: new Date().toISOString(),
    speed: 45,
    heading: 90,
    battery: 78,
    fuel: 65,
  },
  {
    id: 2,
    carId: 2,
    bookingId: 2,
    currentLocation: { lat: 25.7617, lng: -80.1918 }, // Miami
    status: 'in_use',
    lastUpdate: new Date().toISOString(),
    speed: 35,
    heading: 180,
    battery: 92,
    fuel: 88,
  },
  {
    id: 3,
    carId: 3,
    bookingId: null,
    currentLocation: { lat: 27.9506, lng: -82.4572 }, // Tampa
    status: 'available',
    lastUpdate: new Date().toISOString(),
    speed: 0,
    heading: 0,
    battery: 100,
    fuel: 95,
  },
  {
    id: 4,
    carId: 4,
    bookingId: 3,
    currentLocation: { lat: 26.1224, lng: -80.1373 }, // Fort Lauderdale
    status: 'in_use',
    lastUpdate: new Date().toISOString(),
    speed: 55,
    heading: 270,
    battery: 45,
    fuel: 42,
  },
  {
    id: 5,
    carId: 5,
    bookingId: null,
    currentLocation: { lat: 28.2920, lng: -81.4060 }, // Kissimmee
    status: 'maintenance',
    lastUpdate: new Date().toISOString(),
    speed: 0,
    heading: 0,
    battery: 85,
    fuel: 70,
  },
  {
    id: 6,
    carId: 6,
    bookingId: 4,
    currentLocation: { lat: 25.7617, lng: -80.1918 }, // Miami Airport area
    status: 'in_use',
    lastUpdate: new Date().toISOString(),
    speed: 0,
    heading: 0,
    battery: 67,
    fuel: 55,
  },
]

export const tripHistory = [
  {
    id: 1,
    carId: 1,
    bookingId: 1,
    userId: 4,
    startTime: '2025-11-21T08:00:00',
    endTime: '2025-11-21T18:30:00',
    route: [
      { lat: 28.5383, lng: -81.3792, timestamp: '2025-11-21T08:00:00' },
      { lat: 28.5425, lng: -81.3810, timestamp: '2025-11-21T08:15:00' },
      { lat: 28.5480, lng: -81.3850, timestamp: '2025-11-21T08:30:00' },
      { lat: 28.5520, lng: -81.3900, timestamp: '2025-11-21T08:45:00' },
      { lat: 28.5600, lng: -81.3950, timestamp: '2025-11-21T09:00:00' },
      { lat: 28.5650, lng: -81.4000, timestamp: '2025-11-21T09:15:00' },
    ],
    distance: 45.2,
    maxSpeed: 65,
    avgSpeed: 42,
    stops: 3,
  },
  {
    id: 2,
    carId: 2,
    bookingId: 2,
    userId: 5,
    startTime: '2025-11-20T10:00:00',
    endTime: '2025-11-20T16:00:00',
    route: [
      { lat: 25.7617, lng: -80.1918, timestamp: '2025-11-20T10:00:00' },
      { lat: 25.7550, lng: -80.2000, timestamp: '2025-11-20T10:30:00' },
      { lat: 25.7480, lng: -80.2100, timestamp: '2025-11-20T11:00:00' },
      { lat: 25.7400, lng: -80.2200, timestamp: '2025-11-20T11:30:00' },
    ],
    distance: 32.5,
    maxSpeed: 55,
    avgSpeed: 38,
    stops: 2,
  },
]

export const geofences = [
  {
    id: 1,
    carId: 1,
    name: 'Orlando Metro Area',
    center: { lat: 28.5383, lng: -81.3792 },
    radius: 50000, // 50km in meters
    enabled: true,
    alertOnExit: true,
    alertOnEntry: false,
  },
  {
    id: 2,
    carId: 2,
    name: 'Miami-Dade County',
    center: { lat: 25.7617, lng: -80.1918 },
    radius: 60000, // 60km in meters
    enabled: true,
    alertOnExit: true,
    alertOnEntry: false,
  },
  {
    id: 3,
    carId: 4,
    name: 'Fort Lauderdale Zone',
    center: { lat: 26.1224, lng: -80.1373 },
    radius: 40000, // 40km in meters
    enabled: true,
    alertOnExit: true,
    alertOnEntry: false,
  },
]

export const geofenceAlerts = [
  {
    id: 1,
    carId: 1,
    geofenceId: 1,
    type: 'exit',
    timestamp: '2025-11-21T14:30:00',
    location: { lat: 28.5900, lng: -81.4100 },
    acknowledged: false,
    severity: 'warning',
  },
  {
    id: 2,
    carId: 2,
    geofenceId: 2,
    type: 'exit',
    timestamp: '2025-11-20T15:45:00',
    location: { lat: 25.7000, lng: -80.2300 },
    acknowledged: true,
    severity: 'warning',
  },
]

export const vehicleStatuses = ['available', 'reserved', 'in_use', 'returned', 'maintenance']
export const alertSeverities = ['info', 'warning', 'critical']
