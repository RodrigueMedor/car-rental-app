import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { supportTickets, bookings, cars } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'tickets', label: 'Support Tickets', icon: '🎫' },
  { id: 'refunds', label: 'Refund Requests', icon: '💰' },
  { id: 'bookings', label: 'View Bookings', icon: '📋' },
  { id: 'customers', label: 'Customers', icon: '👥' },
]

const statusColors = {
  open: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
}

function AnalyticsCard({ label, value, sub, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  )
}

function StatsRow() {
  const openTickets = supportTickets.filter(t => t.status === 'open').length
  const inProgress = supportTickets.filter(t => t.status === 'in_progress').length
  const resolved = supportTickets.filter(t => t.status === 'resolved').length
  const highPriority = supportTickets.filter(t => t.priority === 'high' || t.priority === 'urgent').length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard label="Open Tickets" value={openTickets} sub="Need attention" icon="🎫" />
      <AnalyticsCard label="In Progress" value={inProgress} sub="Being handled" icon="⏳" />
      <AnalyticsCard label="Resolved Today" value={resolved} sub="Completed" icon="✅" />
      <AnalyticsCard label="High Priority" value={highPriority} sub="Urgent issues" icon="🔥" />
    </div>
  )
}

export default function SupportDashboard() {
  const { currentUser } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [ticketResponse, setTicketResponse] = useState('')

  const sectionTitle = sidebarItems.find(s => s.id === activeSection)?.label || ''

  const updateTicketStatus = (ticketId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Updating ticket ${ticketId} to ${newStatus}`)
  }

  const submitResponse = () => {
    if (!selectedTicket || !ticketResponse.trim()) return
    console.log(`Submitting response for ticket ${selectedTicket.id}: ${ticketResponse}`)
    setTicketResponse('')
    setSelectedTicket(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-orange-900 to-amber-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-orange-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🎧
            </div>
            <div>
              <p className="font-bold text-white text-lg">Support Portal</p>
              <p className="text-xs text-orange-300">{currentUser?.name || 'Support Agent'}</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-orange-200 hover:bg-orange-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-700 bg-orange-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-orange-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-orange-700/50">
            <span>←</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4 flex items-center gap-4 z-20 shadow-sm">
          <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sidebarItems.find(s => s.id === activeSection)?.icon}</span>
            <h1 className="text-xl font-bold text-gray-900">{sectionTitle}</h1>
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <StatsRow />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">🎫</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Tickets</h3>
                  </div>
                  <div className="space-y-4">
                    {supportTickets.slice(0, 4).map(ticket => (
                      <div key={ticket.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ticket.userName}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[ticket.status]}`}>{ticket.status}</span>
                          <span className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📊</span>
                    <h3 className="font-bold text-gray-900 text-lg">Ticket Categories</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { category: 'Refund', count: supportTickets.filter(t => t.category === 'refund').length, color: 'bg-red-500' },
                      { category: 'Vehicle Issue', count: supportTickets.filter(t => t.category === 'vehicle_issue').length, color: 'bg-orange-500' },
                      { category: 'Payment', count: supportTickets.filter(t => t.category === 'payment').length, color: 'bg-yellow-500' },
                      { category: 'Inquiry', count: supportTickets.filter(t => t.category === 'inquiry').length, color: 'bg-blue-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.category}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-100 rounded-full h-2">
                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / supportTickets.length) * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedTicket && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg">Ticket Details</h3>
                    <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Subject</p>
                        <p className="font-medium text-gray-900">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Category</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedTicket.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Customer</p>
                        <p className="font-medium text-gray-900">{selectedTicket.userName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="font-medium text-gray-900">{selectedTicket.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedTicket.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${priorityColors[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                    </div>
                    {selectedTicket.responses.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Previous Responses</p>
                        <div className="space-y-2">
                          {selectedTicket.responses.map((response, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-xl">
                              <p className="text-sm font-medium text-blue-900 mb-1">{response.author}</p>
                              <p className="text-sm text-gray-700">{response.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{new Date(response.createdAt).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Add Response</p>
                      <textarea
                        value={ticketResponse}
                        onChange={(e) => setTicketResponse(e.target.value)}
                        placeholder="Type your response..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        rows={3}
                      />
                      <div className="flex gap-3 mt-3">
                        <button onClick={submitResponse} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Send Response</button>
                        <select 
                          onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'tickets' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">All Support Tickets</h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option>All Status</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option>All Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {supportTickets.map(ticket => (
                    <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>👤 {ticket.userName}</span>
                            <span>📧 {ticket.email}</span>
                            <span>📅 {new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[ticket.status]}`}>{ticket.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'refunds' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">💰</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Refund Requests</h3>
                <p className="text-gray-500 mb-4">Manage and process refund requests from customers</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <p className="text-2xl font-bold text-yellow-700">3</p>
                    <p className="text-sm text-yellow-600">Pending</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-700">12</p>
                    <p className="text-sm text-green-600">Approved</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl">
                    <p className="text-2xl font-bold text-red-700">2</p>
                    <p className="text-sm text-red-600">Rejected</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">All Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookings.map(booking => {
                        const car = cars.find(c => c.id === booking.carId)
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50 text-sm">
                            <td className="px-6 py-4 font-mono text-gray-500">#{booking.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">User #{booking.userId}</td>
                            <td className="px-6 py-4 text-gray-600">{car?.make} {car?.model}</td>
                            <td className="px-6 py-4 text-gray-600">{booking.startDate} → {booking.endDate}</td>
                            <td className="px-6 py-4 font-medium">${booking.totalPrice}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'}`}>{booking.status}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">👥</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Customer Management</h3>
                <p className="text-gray-500 mb-4">View and manage customer accounts and information</p>
                <p className="text-sm text-gray-400">Customer data and account management features</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
