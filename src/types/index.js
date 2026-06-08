/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'user'|'host'|'admin'} role
 * @property {string} avatar
 * @property {number} [driverScore]
 * @property {string[]} [badges]
 *
 * @typedef {Object} Car
 * @property {number} id
 * @property {string} make
 * @property {string} model
 * @property {number} year
 * @property {string} type
 * @property {number} seats
 * @property {number} pricePerDay
 * @property {string} location
 * @property {string[]} images
 * @property {number} hostId
 * @property {{name:string, rating:number, trips:number}} host
 * @property {string[]} features
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string} transmission
 * @property {string} fuelType
 * @property {string} mileage
 * @property {boolean} available
 * @property {number} lat
 * @property {number} lng
 * @property {string} [category]
 * @property {boolean} [rentToOwn]
 *
 * @typedef {Object} Booking
 * @property {number} id
 * @property {number} carId
 * @property {number} userId
 * @property {string} startDate
 * @property {string} endDate
 * @property {'pending'|'confirmed'|'completed'|'cancelled'} status
 * @property {number} totalPrice
 * @property {string[]} addons
 * @property {string} pickupLocation
 * @property {string} returnLocation
 * @property {string} createdAt
 * @property {Object} [airportConcierge]
 * @property {Object} [familyPackage]
 *
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} icon
 *
 * @typedef {Object} Experience
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} duration
 * @property {string} location
 * @property {string} category
 * @property {string} hostName
 * @property {number} hostId
 * @property {string} image
 * @property {number} rating
 * @property {number} reviewCount
 *
 * @typedef {Object} Subscription
 * @property {string} id
 * @property {string} name
 * @property {number} monthlyPrice
 * @property {string[]} features
 * @property {string} color
 * @property {number} [discount]
 * @property {number} [swaps]
 *
 * @typedef {Object} Destination
 * @property {string} city
 * @property {string} state
 * @property {string[]} attractions
 * @property {string[]} recommendedCars
 * @property {string} vibe
 * @property {string} image
 */
