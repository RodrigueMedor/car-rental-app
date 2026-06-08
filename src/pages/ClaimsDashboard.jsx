import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { insuranceClaims, bookings, cars } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'claims', label: 'Insurance Claims', icon: '📋' },
  { id: 'incidents', label: 'Incident Reports', icon: '🚨' },
  { id: 'damage', label: 'Damage Reports', icon: '🔧' },
  { id: 'documents', label: 'Documents', icon: '📄' },
]

const statusColors = {
  submitted: 'bg-gray-100 text-gray-700',
  pending_review: 'bg-yellow-100 text-yellow-700',
  in_review: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  paid: 'bg-purple-100 text-purple-700',
}

const incidentTypeColors = {
  collision: 'bg-red-100 text-red-700',
  theft: 'bg-purple-100 text-purple-700',
  vandalism: 'bg-orange-100 text-orange-700',
  weather_damage: 'bg-blue-100 text-blue-700',
  mechanical: 'bg-yellow-100 text-yellow-700',
  windshield: 'bg-cyan-100 text-cyan-700',
  tire_damage: 'bg-gray-100 text-gray-700',
  other: 'bg-gray-100 text-gray-700',
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
  const pendingClaims = insuranceClaims.filter(c => c.status === 'pending_review' || c.status === 'in_review').length
  const approvedClaims = insuranceClaims.filter(c => c.status === 'approved').length
  const rejectedClaims = insuranceClaims.filter(c => c.status === 'rejected').length
  const totalPayout = insuranceClaims.filter(c => c.status === 'approved' || c.status === 'paid').reduce((sum, c) => sum + c.damageEstimate, 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard label="Pending Claims" value={pendingClaims} sub="Need review" icon="⏳" />
      <AnalyticsCard label="Approved Claims" value={approvedClaims} sub="This month" icon="✅" />
      <AnalyticsCard label="Rejected Claims" value={rejectedClaims} sub="This month" icon="❌" />
      <AnalyticsCard label="Total Payouts" value={`$${totalPayout.toLocaleString()}`} sub="Approved claims" icon="💰" />
    </div>
  )
}

export default function ClaimsDashboard() {
  const { currentUser } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState(null)

  const sectionTitle = sidebarItems.find(s => s.id === activeSection)?.label || ''

  const updateClaimStatus = (claimId, newStatus) => {
    console.log(`Updating claim ${claimId} to ${newStatus}`)
  }

  const addNote = (claimId, note) => {
    console.log(`Adding note to claim ${claimId}: ${note}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-red-900 to-pink-800 z-40 w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-red-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🛡️
            </div>
            <div>
              <p className="font-bold text-white text-lg">Claims Portal</p>
              <p className="text-xs text-red-300">{currentUser?.name || 'Claims Manager'}</p>
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
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
                  : 'text-red-200 hover:bg-red-700/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-700 bg-red-900/50 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 text-sm text-red-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-red-700/50">
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
                    <span className="text-xl">📋</span>
                    <h3 className="font-bold text-gray-900 text-lg">Recent Claims</h3>
                  </div>
                  <div className="space-y-4">
                    {insuranceClaims.slice(0, 4).map(claim => (
                      <div key={claim.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setSelectedClaim(claim)}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{claim.incidentType.replace('_', ' ')}</h4>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[claim.status]}`}>{claim.status.replace('_', ' ')}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{claim.userName} • {claim.incidentLocation}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">${claim.damageEstimate.toLocaleString()}</span>
                          <span className="text-xs text-gray-400">{new Date(claim.incidentDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">📊</span>
                    <h3 className="font-bold text-gray-900 text-lg">Incident Types</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { type: 'Collision', count: insuranceClaims.filter(c => c.incidentType === 'collision').length, color: 'bg-red-500' },
                      { type: 'Theft', count: insuranceClaims.filter(c => c.incidentType === 'theft').length, color: 'bg-purple-500' },
                      { type: 'Weather Damage', count: insuranceClaims.filter(c => c.incidentType === 'weather_damage').length, color: 'bg-blue-500' },
                      { type: 'Mechanical', count: insuranceClaims.filter(c => c.incidentType === 'mechanical').length, color: 'bg-yellow-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.type}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-100 rounded-full h-2">
                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / insuranceClaims.length) * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedClaim && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg">Claim Details</h3>
                    <button onClick={() => setSelectedClaim(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Claim ID</p>
                        <p className="font-medium text-gray-900">#{selectedClaim.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Incident Type</p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${incidentTypeColors[selectedClaim.incidentType]}`}>{selectedClaim.incidentType.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Customer</p>
                        <p className="font-medium text-gray-900">{selectedClaim.userName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                        <p className="font-medium text-gray-900">#{selectedClaim.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Incident Date</p>
                        <p className="font-medium text-gray-900">{new Date(selectedClaim.incidentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="font-medium text-gray-900">{selectedClaim.incidentLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Damage Estimate</p>
                        <p className="font-bold text-red-600">${selectedClaim.damageEstimate.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[selectedClaim.status]}`}>{selectedClaim.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedClaim.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Photos</p>
                      <div className="flex gap-3">
                        {selectedClaim.photos.map((photo, index) => (
                          <img key={index} src={photo} alt="" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClaim.documents.map((doc, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">📄 {doc}</span>
                        ))}
                      </div>
                    </div>
                    {selectedClaim.notes.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Notes</p>
                        <div className="space-y-2">
                          {selectedClaim.notes.map((note, index) => (
                            <div key={index} className="bg-yellow-50 p-3 rounded-xl">
                              <p className="text-sm font-medium text-yellow-900 mb-1">{note.author}</p>
                              <p className="text-sm text-gray-700">{note.note}</p>
                              <p className="text-xs text-gray-400 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => updateClaimStatus(selectedClaim.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Approve Claim
                      </button>
                      <button 
                        onClick={() => updateClaimStatus(selectedClaim.id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Reject Claim
                      </button>
                      <select 
                        onChange={(e) => updateClaimStatus(selectedClaim.id, e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white"
                      >
                        <option value="">Change Status</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="in_review">In Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'claims' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">All Insurance Claims</h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option>All Status</option>
                      <option>Submitted</option>
                      <option>Pending Review</option>
                      <option>In Review</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                      <option>Paid</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option>All Types</option>
                      <option>Collision</option>
                      <option>Theft</option>
                      <option>Vandalism</option>
                      <option>Weather Damage</option>
                      <option>Mechanical</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {insuranceClaims.map(claim => (
                    <div key={claim.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedClaim(claim)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">Claim #{claim.id}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${incidentTypeColors[claim.incidentType]}`}>{claim.incidentType.replace('_', ' ')}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{claim.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>👤 {claim.userName}</span>
                            <span>📍 {claim.incidentLocation}</span>
                            <span>📅 {new Date(claim.incidentDate).toLocaleDateString()}</span>
                            <span>💰 ${claim.damageEstimate.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[claim.status]}`}>{claim.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'incidents' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">🚨</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Incident Reports</h3>
                <p className="text-gray-500 mb-4">View and manage all incident reports submitted by customers</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-red-50 rounded-xl">
                    <p className="text-2xl font-bold text-red-700">{insuranceClaims.filter(c => c.incidentType === 'collision').length}</p>
                    <p className="text-sm text-red-600">Collisions</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-700">{insuranceClaims.filter(c => c.incidentType === 'theft').length}</p>
                    <p className="text-sm text-purple-600">Thefts</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-700">{insuranceClaims.filter(c => c.incidentType === 'weather_damage').length}</p>
                    <p className="text-sm text-blue-600">Weather Damage</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'damage' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">🔧</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Damage Reports</h3>
                <p className="text-gray-500 mb-4">Detailed damage reports for insurance claims</p>
                <p className="text-sm text-gray-400">Damage assessment and documentation features</p>
              </div>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                <span className="text-4xl mb-4 block">📄</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Document Management</h3>
                <p className="text-gray-500 mb-4">Upload and manage claim documents, police reports, and evidence</p>
                <p className="text-sm text-gray-400">Document storage and organization features</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
