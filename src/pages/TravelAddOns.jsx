import { useState } from 'react'
import { travelAddOns, addOnCategories } from '../data/mockData'

export default function TravelAddOns() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filteredAddOns = selectedCategory === 'All'
    ? travelAddOns
    : travelAddOns.filter(addOn => addOn.category === selectedCategory)

  const addToCart = (addOn) => {
    const existing = cart.find(item => item.id === addOn.id)
    if (existing) {
      setCart(cart.map(item => item.id === addOn.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...addOn, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.pricePerDay * item.quantity), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-5xl block mb-4">🎒</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Travel Add-On Marketplace</h1>
          <p className="text-gray-600 text-lg">Enhance your trip with additional equipment and services</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {addOnCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredAddOns.map(addOn => (
            <div key={addOn.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={addOn.image} alt={addOn.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">{addOn.category}</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-1">{addOn.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{addOn.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary-600">${addOn.pricePerDay}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <button
                    onClick={() => addToCart(addOn)}
                    disabled={!addOn.available}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      addOn.available
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {addOn.available ? 'Add' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-primary-600 hover:bg-primary-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center transition-colors"
            >
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          </div>
        )}

        {showCart && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">${item.pricePerDay}/day</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Daily Total</span>
                        <span className="text-2xl font-bold text-teal-700">${calculateTotal()}</span>
                      </div>
                    </div>

                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors">
                      Add to Booking
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
