import { useState, useMemo, useCallback } from 'react'
import { calculateBookingPrice } from '../services/bookingService'

const ADDON_PRICES = {
  airportDelivery: 35, childSeat: 25, gps: 15, concierge: 50, vacationPackage: 120,
  terminalPickup: 20, meetAndGreet: 30, luggageAssistance: 25, vipDelivery: 60,
  familyChildSeat: 25, familyStroller: 20, familyCooler: 15, familyWifi: 18, familyCharger: 10,
}

export function useBooking(car) {
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [addons, setAddons] = useState({})

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 1
    return Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
  }, [pickupDate, returnDate])

  const pricing = useMemo(() => {
    if (!car) return { rental: 0, addonTotal: 0, serviceFee: 0, total: 0 }
    return calculateBookingPrice(car, days, addons, ADDON_PRICES)
  }, [car, days, addons])

  const toggleAddon = useCallback((key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const reset = useCallback(() => {
    setPickupDate('')
    setReturnDate('')
    setAddons({})
  }, [])

  return { pickupDate, setPickupDate, returnDate, setReturnDate, days, addons, toggleAddon, pricing, ADDON_PRICES, reset }
}
