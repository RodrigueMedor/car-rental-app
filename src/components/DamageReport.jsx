import { useState } from 'react'

export default function DamageReport({ report }) {
  const [expanded, setExpanded] = useState(false)
  if (!report) return null

  const statusColors = {
    'No Damage': 'bg-green-100 text-green-700 border-green-200',
    'Minor Damage': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Major Damage': 'bg-red-100 text-red-700 border-red-200',
  }

  const statusIcons = {
    'No Damage': '✅',
    'Minor Damage': '⚠️',
    'Major Damage': '❌',
  }

  return (
    <div className={`rounded-xl border-2 p-5 ${statusColors[report.status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{statusIcons[report.status] || '🔍'}</span>
          <div>
            <p className="font-bold text-lg">{report.status}</p>
            <p className="text-sm opacity-75">Confidence: {report.confidence}%</p>
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-sm font-medium opacity-75 hover:opacity-100">
          {expanded ? 'Hide details' : 'View details'}
        </button>
      </div>
      {expanded && report.detectedIssues && report.detectedIssues.length > 0 && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <p className="text-sm font-semibold mb-2">Detected Issues:</p>
          <ul className="space-y-1">
            {report.detectedIssues.map((issue, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span>•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs mt-3 opacity-60">Analyzed: {new Date(report.analyzedAt).toLocaleString()}</p>
    </div>
  )
}
