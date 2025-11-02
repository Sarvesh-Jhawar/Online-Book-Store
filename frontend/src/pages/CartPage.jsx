"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle } from "lucide-react"

function CartPage({ cart, onUpdateQuantity, onRemove, user, onCheckoutComplete }) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateTotal() * 0.1
  }

  const shippingCost = cart.length > 0 ? 9.99 : 0
  const finalTotal = calculateTotal() + calculateTax() + shippingCost

  const handleCheckout = async () => {
    if (!user || !user.token) {
      navigate('/login')
      return
    }

    setIsProcessing(true)
    try {
      const { ordersAPI } = await import("../services/api")
      await ordersAPI.create({})
      
      // Reload cart to clear items
      if (onCheckoutComplete) {
        await onCheckoutComplete()
      }
      
      // Redirect to orders page
      navigate('/orders')
    } catch (error) {
      console.error("Error processing checkout:", error)
      alert("Failed to process checkout. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some books to get started!</p>
          <Link
            to="/books"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="flex flex-col sm:flex-row gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <Link to={`/book/${item._id || item.id}`} className="flex-shrink-0 w-24 h-32">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/book/${item._id || item.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors mb-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-600 mb-4">{item.author}</p>
                  <p className="text-purple-600 font-bold text-lg">
                    ₹{item.price}
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-fit">
                  <button
                    onClick={() => onUpdateQuantity(item._id || item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Minus size={18} className="text-gray-600" />
                  </button>
                  <span className="px-3 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item._id || item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Plus size={18} className="text-gray-600" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => onRemove(item._id || item.id)}
                    className="mt-2 text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b pb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-purple-600">₹{finalTotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold text-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Proceed to Checkout
                </>
              )}
            </button>

            <Link
              to="/books"
              className="w-full text-center border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
