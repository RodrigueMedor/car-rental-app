import { useState } from 'react'

const conciergeServices = [
  { id: 1, title: 'Hotel Booking Assistance', description: 'Get the best rates on hotels, resorts, and vacation rentals across Florida. Our team negotiates exclusive discounts.', price: 'Free', icon: '🏨', highlights: ['Best rate guarantee', 'Last-minute booking', 'Room upgrades', 'Extended checkout'] },
  { id: 2, title: 'Restaurant Recommendations', description: 'Personalized dining suggestions based on your taste, budget, and location. From food trucks to Michelin-starred.', price: 'Free', icon: '🍽️', highlights: ['Personalized picks', 'Reservation booking', 'Dietary preferences', 'Price range matching'] },
  { id: 3, title: 'Theme Park Planning', description: 'Full-service theme park itinerary including ticket booking, fast passes, dining reservations, and transportation.', price: 25, icon: '🎢', highlights: ['Ticket booking', 'Fast pass selection', 'Dining reservations', 'Transportation安排'] },
  { id: 4, title: 'Event Ticket Assistance', description: 'Premium access to concerts, sports events, theater shows, and festivals across Florida. Skip the waitlists.', price: 15, icon: '🎫', highlights: ['Premium seating', 'Sold-out events', 'Last-minute tickets', 'Group bookings'] },
  { id: 5, title: 'Airport Concierge', description: 'End-to-end airport assistance including terminal pickup, luggage handling, and VIP lounge access.', price: 55, icon: '🛎️', highlights: ['Meet & greet', 'Luggage assistance', 'VIP lounge', 'Fast track security'] },
  { id: 6, title: 'Spa & Wellness Booking', description: 'Access to exclusive spa and wellness centers. Massages, facials, yoga sessions, and more.', price: 20, icon: '💆', highlights: ['Exclusive access', 'Couple packages', 'Mobile spa', 'Gift certificates'] },
]

export default function Concierge() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-rose-600 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">✨</span>
          <h1 className="text-4xl font-bold mb-3">Concierge Marketplace</h1>
          <p className="text-lg text-rose-100 max-w-2xl mx-auto">Let our concierge team handle every detail of your Florida trip. From hotel booking to event tickets, we've got you covered.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conciergeServices.map((svc) => (
            <div key={svc.id} className={`bg-white rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${selected === svc.id ? 'border-rose-500 shadow-lg' : 'border-gray-100 hover:shadow-md'}`} onClick={() => setSelected(svc.id === selected ? null : svc.id)}>
              <div className="p-6">
                <div className="text-4xl mb-3">{svc.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-bold ${svc.price === 'Free' ? 'text-green-600' : 'text-rose-600'}`}>{svc.price === 'Free' ? '✓ Free' : `$${svc.price}`}</span>
                  <span className="text-sm text-rose-600 font-medium">{selected === svc.id ? '▼ Less' : '▶ More'}</span>
                </div>
                {selected === svc.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <ul className="space-y-2">
                      {svc.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                      Book This Service
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
