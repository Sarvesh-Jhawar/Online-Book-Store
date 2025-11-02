"use client"

import { ShoppingCart, Star, Trash2 } from "lucide-react"

function BookCard({ book, onAddToCart, cart, onRemoveFromCart }) {
  const isInCart = cart && cart.some((item) => (item._id || item.id) === (book._id || book.id))

  const handleAddToCart = () => {
    onAddToCart({ ...book, quantity: 1 })
  }

  const handleRemoveFromCart = () => {
    onRemoveFromCart(book._id || book.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {book.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{book.discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({book.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-purple-600">₹{book.price}</span>
          {book.originalPrice && <span className="text-sm text-gray-500 line-through">₹{book.originalPrice}</span>}
        </div>

        <button
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          className={`w-full py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium ${
            isInCart
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {isInCart ? <Trash2 size={18} /> : <ShoppingCart size={18} />}
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default BookCard
