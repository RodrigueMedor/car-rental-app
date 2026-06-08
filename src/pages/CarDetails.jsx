import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { cars, bookings, reviews as allReviews } from '../data/mockData'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import { useAuth } from '../context/AuthContext'

export default function CarDetails() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

  const car = useMemo(() => cars.find((c) => c.id === Number(id)), [id])
  const reviews = useMemo(() => allReviews.filter((r) => r.carId === Number(id)), [id])

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="text-5xl block mb-4">😕</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car not found</h2>
          <Link to="/cars" className="text-primary-600 hover:text-primary-800 font-medium">
            Browse available cars
          </Link>
        </div>
      </div>
    )
  }

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
    : 1

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!currentUser) {
      alert('Please log in to submit a review')
      return
    }
    const review = {
      id: allReviews.length + 1,
      carId: car.id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    }
    allReviews.push(review)
    setNewReview({ rating: 5, comment: '' })
    setShowReviewForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Link to="/cars" className="text-sm text-gray-500 hover:text-primary-600">
            ← Back to listing
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="rounded-xl overflow-hidden h-72 sm:h-96 mb-3">
              <img
                src={car.images[selectedImage]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === selectedImage ? 'border-primary-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <p className="text-gray-500 mt-1">
                    📍 {car.location} · {car.type} · {car.seats} seats
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary-600">${car.pricePerDay}</span>
                  <span className="text-gray-500"> /day</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
                <img src={car.host.avatar || `https://i.pravatar.cc/40?u=${car.host.name}`} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">{car.host.name}</p>
                  <p className="text-sm text-gray-500">⭐ {car.host.rating} · {car.host.trips} trips</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f, i) => (
                    <span key={i} className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <AvailabilityCalendar carId={car.id} bookings={bookings} />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Book this car</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Pickup</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Return</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4 p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-800">
                    ${car.pricePerDay} × {days} {days === 1 ? 'day' : 'days'}
                  </span>
                  <span className="font-bold text-green-800">${car.pricePerDay * days}</span>
                </div>

                <Link
                  to={`/booking/${car.id}?pickup=${pickupDate}&return=${returnDate}`}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors text-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this car</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Transmission</span><p className="font-medium">{car.transmission}</p></div>
              <div><span className="text-gray-500">Fuel</span><p className="font-medium">{car.fuelType}</p></div>
              <div><span className="text-gray-500">Mileage</span><p className="font-medium">{car.mileage}</p></div>
              <div><span className="text-gray-500">Seats</span><p className="font-medium">{car.seats}</p></div>
              <div><span className="text-gray-500">Type</span><p className="font-medium">{car.type}</p></div>
              <div><span className="text-gray-500">Location</span><p className="font-medium">{car.location}</p></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary-600">⭐ {car.rating}</span>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {showReviewForm ? 'Cancel' : 'Write Review'}
                </button>
              </div>
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`text-2xl transition-colors ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience with this car..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    rows="3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">{review.userName}</span>
                    <span className="text-sm text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
