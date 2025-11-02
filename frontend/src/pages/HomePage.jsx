"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BookCard from "../components/BookCard"
import { booksAPI } from "../services/api"
import { ArrowRight, BookOpen, Truck, Award } from "lucide-react"

function HomePage({ onAddToCart, cart, onRemoveFromCart }) {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const books = await booksAPI.getAll({ sortBy: "featured" })
        setFeaturedBooks(books.slice(0, 6))
      } catch (error) {
        console.error("Error fetching featured books:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedBooks()
  }, [])

  const categories = [
    { name: "Fiction", icon: "📖", color: "from-blue-400 to-blue-600" },
    { name: "Non-Fiction", icon: "📚", color: "from-green-400 to-green-600" },
    { name: "Science Fiction", icon: "🔬", color: "from-purple-400 to-purple-600" },
    { name: "Biography", icon: "👤", color: "from-orange-400 to-orange-600" },
  ]

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Next Great Read</h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">Browse thousands of books and find your favorites</p>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/books?category=${category.name}`}
              className={`bg-gradient-to-br ${category.color} p-8 rounded-lg text-white hover:shadow-lg transition-shadow duration-300 text-center`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="text-xl font-bold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
          <Link to="/books" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} cart={cart} onRemoveFromCart={onRemoveFromCart} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <BookOpen size={40} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of books across all genres and categories</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <Truck size={40} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <Award size={40} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with exclusive discounts</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-6">Get exclusive deals and book recommendations</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
