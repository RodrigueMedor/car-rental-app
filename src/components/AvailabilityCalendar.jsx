import { useState, useMemo } from 'react'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AvailabilityCalendar({ carId, bookings }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const carBookings = useMemo(
    () => (bookings || []).filter((b) => b.carId === carId && (b.status === 'confirmed' || b.status === 'pending')),
    [carId, bookings]
  )

  const bookedDates = useMemo(() => {
    const dates = new Set()
    carBookings.forEach((b) => {
      const start = new Date(b.startDate)
      const end = new Date(b.endDate)
      const current = new Date(start)
      while (current <= end) {
        dates.add(current.toISOString().split('T')[0])
        current.setDate(current.getDate() + 1)
      }
    })
    return dates
  }, [carBookings])

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({ day: d, dateStr, booked: bookedDates.has(dateStr) })
    }
    return days
  }, [currentYear, currentMonth, bookedDates])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const isPast = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth < today.getMonth())

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Availability</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            disabled={isPast}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 w-32 text-center">
            {months[currentMonth]} {currentYear}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
        {weekdays.map((d) => (
          <div key={d} className="text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {calendarDays.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} />
          }
          const isToday = day.dateStr === today.toISOString().split('T')[0]
          return (
            <div
              key={day.dateStr}
              className={`text-sm py-1.5 rounded ${
                day.booked
                  ? 'bg-red-100 text-red-500 line-through'
                  : isToday
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={day.booked ? 'Booked' : 'Available'}
            >
              {day.day}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-100 inline-block" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary-100 inline-block" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-gray-300 inline-block" />
          <span>Available</span>
        </div>
      </div>
    </div>
  )
}
