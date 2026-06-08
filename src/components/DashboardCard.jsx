export default function DashboardCard({ title, value, change, icon, color }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-2xl ${color || 'text-primary-600'}`}>{icon}</span>
        {change !== undefined && (
          <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' && value > 999 ? `$${value.toLocaleString()}` : value}
      </p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}
