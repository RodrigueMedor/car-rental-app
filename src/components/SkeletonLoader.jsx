export default function SkeletonLoader({ type = 'card', count = 1 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <div className="h-5 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 animate-pulse flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return null
}
