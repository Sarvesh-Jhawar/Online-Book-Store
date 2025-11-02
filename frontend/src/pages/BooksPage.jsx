"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"
import SearchBar from "../components/SearchBar"
import { booksAPI } from "../services/api"
import { ChevronDown } from "lucide-react"

function BooksPage({ onAddToCart, cart, onRemoveFromCart }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const categories = ["All", "Fiction", "Non-Fiction", "Science Fiction", "Biography", "Mystery", "Fantasy", "Self-Help", "Psychology", "Historical Fiction"]

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const params = {}
        if (selectedCategory !== "All") {
          params.category = selectedCategory
        }
        if (searchQuery) {
          params.search = searchQuery
        }
        if (sortBy) {
          params.sortBy = sortBy
        }
        
        const fetchedBooks = await booksAPI.getAll(params)
        setBooks(fetchedBooks)
        setFilteredBooks(fetchedBooks)
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [selectedCategory, sortBy, searchQuery])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    setSearchParams(category === "All" ? {} : { category })
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Sort By</h3>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600"
                  size={20}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Price Range</h3>
              <input type="range" min="0" max="30" className="w-full" />
              <p className="text-sm text-gray-600 mt-2">₹0 - ₹30</p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold">{filteredBooks.length}</span> results
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading books...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book._id || book.id} book={book} onAddToCart={onAddToCart} cart={cart} onRemoveFromCart={onRemoveFromCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No books found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default BooksPage
