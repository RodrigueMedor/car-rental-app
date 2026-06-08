import { useState } from 'react'
import { analyzeDamage } from '../services/aiService'
import DamageReport from '../components/DamageReport'

export default function VehicleInspection() {
  const [step, setStep] = useState('before')
  const [beforePhotos, setBeforePhotos] = useState([])
  const [afterPhotos, setAfterPhotos] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState(null)

  const handlePhotoUpload = (e, type) => {
    const files = Array.from(e.target.files).slice(0, 6)
    const photos = files.map((f) => ({ id: Math.random(), name: f.name, url: URL.createObjectURL(f), size: f.size }))
    if (type === 'before') setBeforePhotos((prev) => [...prev, ...photos].slice(0, 6))
    else setAfterPhotos((prev) => [...prev, ...photos].slice(0, 6))
  }

  const removePhoto = (id, type) => {
    if (type === 'before') setBeforePhotos((prev) => prev.filter((p) => p.id !== id))
    else setAfterPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    const res = await analyzeDamage([...beforePhotos, ...afterPhotos])
    setReport(res.data)
    setAnalyzing(false)
  }

  const reset = () => {
    setStep('before')
    setBeforePhotos([])
    setAfterPhotos([])
    setReport(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-5xl block mb-4">📷</span>
          <h1 className="text-4xl font-bold mb-3">Vehicle Inspection</h1>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">Upload before and after photos for AI-powered damage detection. Protect yourself and your vehicle.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['before', 'after', 'results'].map((s) => (
              <button key={s} onClick={() => s === 'results' && report ? setStep(s) : s !== 'results' && setStep(s)} disabled={s === 'results' && !report} className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${step === s ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50 disabled:opacity-40'}`}>
                {s === 'before' ? '1. Before Photos' : s === 'after' ? '2. After Photos' : '3. AI Analysis'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {step === 'before' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Before Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Take photos of the vehicle before your trip. Include all angles.</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {beforePhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img src={photo.url} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button onClick={() => removePhoto(photo.id, 'before')} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                    </div>
                  ))}
                  {beforePhotos.length < 6 && (
                    <label className="border-2 border-dashed border-gray-200 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                      <span className="text-2xl text-gray-300">+</span>
                      <span className="text-xs text-gray-400">Add photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'before')} />
                    </label>
                  )}
                </div>
                <button onClick={() => setStep('after')} disabled={beforePhotos.length === 0} className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">Continue to After Photos</button>
              </div>
            )}

            {step === 'after' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Upload After Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Take photos of the vehicle after your trip to document its condition.</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {afterPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img src={photo.url} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button onClick={() => removePhoto(photo.id, 'after')} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                    </div>
                  ))}
                  {afterPhotos.length < 6 && (
                    <label className="border-2 border-dashed border-gray-200 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                      <span className="text-2xl text-gray-300">+</span>
                      <span className="text-xs text-gray-400">Add photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'after')} />
                    </label>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep('before')} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Back</button>
                  <button onClick={handleAnalyze} disabled={afterPhotos.length === 0 || analyzing} className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                    {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
                  </button>
                </div>
              </div>
            )}

            {step === 'results' && report && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Analysis Results</h3>
                <p className="text-sm text-gray-500 mb-4">Our AI analyzed the photos and generated a damage report.</p>
                <DamageReport report={report} />
                <button onClick={reset} className="mt-4 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Start New Inspection</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <p className="font-medium mb-1">⚠️ Mock AI Analysis</p>
          <p>This is a placeholder AI damage detection system. It randomly generates results for demonstration purposes. No actual image analysis is performed.</p>
        </div>
      </div>
    </div>
  )
}
