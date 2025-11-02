"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ShoppingCart, LogOut, Package } from "lucide-react"

function Navbar({ cartCount, isLoggedIn, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">BookStore</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-purple-600 transition">
              Books
            </Link>
            <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
              <ShoppingCart size={20} />
              <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">{cartCount}</span>
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/orders" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
                  <Package size={20} />
                  Orders
                </Link>
                <span className="text-gray-700">Hello, {user?.name || "User"}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                Login
              </Link>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-purple-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-purple-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="block py-2 text-gray-700 hover:text-purple-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/cart"
              className="block py-2 text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={20} />
              Cart ({cartCount})
            </Link>
            {isLoggedIn && (
              <Link
                to="/orders"
                className="block py-2 text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Package size={20} />
                Orders
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  onLogout()
                  setIsOpen(false)
                }}
                className="w-full mt-2 flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
