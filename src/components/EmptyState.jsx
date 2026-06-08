import { Link } from 'react-router-dom'

export default function EmptyState({ icon = '📭', title, message, actionLabel, actionLink }) {
  return (
    <div className="text-center py-16 px-4">
      <span className="text-6xl block mb-4">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
