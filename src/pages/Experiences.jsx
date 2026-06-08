import { useState, useMemo } from 'react'
import { experiences } from '../data/experiences'
import ExperienceCard from '../components/ExperienceCard'

const categories = ['All', 'City Tours', 'Water Activities', 'Photography', 'Transportation', 'Adventure']

export default function Experiences() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(() => {
    if (filter === 'All') return experiences
    return experiences.filter((e) => e.category === filter)
  }, [filter])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">🎉</span>
          <h1 className="text-4xl font-bold mb-3">Local Experiences</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">Discover unique experiences offered by local hosts. From city tours to fishing trips, make your Florida trip unforgettable.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{cat}</button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => <ExperienceCard key={exp.id} experience={exp} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-500">Try a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}
