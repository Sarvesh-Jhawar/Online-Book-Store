"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { booksAPI } from "../services/api"
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react"

function BookDetailsPage({ onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedBooks, setRelatedBooks] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const fetchedBook = await booksAPI.getById(id)
        setBook(fetchedBook)

        // Fetch related books
        if (fetchedBook?.category) {
          const allBooks = await booksAPI.getAll({ category: fetchedBook.category })
          const related = allBooks.filter((b) => b._id !== id)
          setRelatedBooks(related.slice(0, 4))
        }
      } catch (error) {
        console.error("Error fetching book:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading book...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Book not found</p>
          <Link to="/books" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
            Back to Books
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    try {
      await onAddToCart({ ...book, quantity })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Books
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-gray-100 rounded-lg overflow-hidden">
              <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-auto object-cover" />
              {book.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded font-bold">
                  -{book.discount}%
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                {book.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-purple-600">₹{book.price}</span>
                {book.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{book.originalPrice}</span>
                )}
              </div>
              {book.discount && <p className="text-green-600 font-semibold">Save {book.discount}% on this item!</p>}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">ISBN</p>
                  <p className="font-semibold text-gray-900">{book.isbn}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Publisher</p>
                  <p className="font-semibold text-gray-900">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pages</p>
                  <p className="font-semibold text-gray-900">{book.pages}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Published</p>
                  <p className="font-semibold text-gray-900">{book.year}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                  <Minus size={20} className="text-gray-600" />
                </button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-bold text-lg"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
            </div>

            {addedToCart && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg font-semibold">
                ✓ Added to cart successfully!
              </div>
            )}
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <section className="border-t pt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook._id || relatedBook.id}
                  to={`/book/${relatedBook._id || relatedBook.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedBook.image || "/placeholder.svg"}
                    alt={relatedBook.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{relatedBook.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="text-purple-600 font-bold">₹{relatedBook.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BookDetailsPage
