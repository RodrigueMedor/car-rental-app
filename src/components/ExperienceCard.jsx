export default function ExperienceCard({ experience }) {
  if (!experience) return null
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img src={experience.image} alt={experience.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-full">{experience.category}</span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900">{experience.title}</h3>
          <span className="text-sm text-yellow-500 font-semibold">⭐ {experience.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">📍 {experience.location} · {experience.duration}</p>
        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">{experience.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <span className="text-xl font-bold text-primary-600">${experience.price}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{experience.reviewCount} reviews</span>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-800">Book now →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
