"use client"

import { useState, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./src/components/Navbar"
import Footer from "./src/components/Footer"
import HomePage from "./src/pages/HomePage"
import BooksPage from "./src/pages/BooksPage"
import BookDetailsPage from "./src/pages/BookDetailsPage"
import CartPage from "./src/pages/CartPage"
import OrdersPage from "./src/pages/OrdersPage"
import LoginPage from "./src/pages/LoginPage"
import SignupPage from "./src/pages/SignupPage"


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("bookstoreCart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("bookstoreUser")
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookstoreUser", JSON.stringify(user))
  }, [user])

  // Function to load cart from backend or localStorage
  const loadCart = useCallback(async () => {
    if (user && user.token) {
      try {
        const { cartAPI } = await import("./src/services/api")
        const cartItems = await cartAPI.get()
        setCart(cartItems)
      } catch (error) {
        console.error("Error loading cart:", error)
        // If cart fails to load (e.g., user not authenticated), clear cart
        setCart([])
      }
    } else {
      // User not logged in, use localStorage cart
      const savedCart = localStorage.getItem("bookstoreCart")
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart))
        } catch (e) {
          setCart([])
        }
      }
    }
  }, [user])

  // Load cart from backend when user is logged in
  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Persist cart to localStorage when user is not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("bookstoreCart", JSON.stringify(cart))
    }
  }, [cart, user])

  const addToCart = async (book) => {
    const bookId = book._id || book.id
    const quantity = book.quantity || 1

    if (user && user.token) {
      // Sync with backend
      try {
        const { cartAPI } = await import("./src/services/api")
        const updatedCart = await cartAPI.add(bookId, quantity)
        setCart(updatedCart)
      } catch (error) {
        console.error("Error adding to cart:", error)
        alert("Failed to add item to cart. Please try again.")
      }
    } else {
      // Local cart for non-authenticated users
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => (item._id || item.id) === bookId)
        if (existingItem) {
          return prevCart.map((item) =>
            (item._id || item.id) === bookId
              ? { ...item, quantity: (item.quantity || 1) + quantity }
              : item
          )
        }
        return [...prevCart, { ...book, quantity }]
      })
    }
  }

  const removeFromCart = async (bookId) => {
    if (user && user.token) {
      // Sync with backend
      try {
        const { cartAPI } = await import("./src/services/api")
        const updatedCart = await cartAPI.remove(bookId)
        setCart(updatedCart)
      } catch (error) {
        console.error("Error removing from cart:", error)
        alert("Failed to remove item from cart. Please try again.")
      }
    } else {
      // Local cart
      setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== bookId))
    }
  }

  const updateCartQuantity = async (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }

    if (user && user.token) {
      // Sync with backend
      try {
        const { cartAPI } = await import("./src/services/api")
        const updatedCart = await cartAPI.update(bookId, quantity)
        setCart(updatedCart)
      } catch (error) {
        console.error("Error updating cart:", error)
        alert("Failed to update cart. Please try again.")
      }
    } else {
      // Local cart
      setCart((prevCart) =>
        prevCart.map((item) =>
          (item._id || item.id) === bookId ? { ...item, quantity } : item
        )
      )
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    localStorage.removeItem("bookstoreUser")
    localStorage.removeItem("bookstoreCart")
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar cartCount={cart.length} isLoggedIn={!!user} user={user} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} cart={cart} onRemoveFromCart={removeFromCart} />} />
            <Route path="/books" element={<BooksPage onAddToCart={addToCart} cart={cart} onRemoveFromCart={removeFromCart} />} />
            <Route path="/book/:id" element={<BookDetailsPage onAddToCart={addToCart} cart={cart} onRemoveFromCart={removeFromCart} />} />
            <Route
              path="/cart"
              element={
                <CartPage cart={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} user={user} onCheckoutComplete={loadCart} />
              }
            />
            <Route path="/orders" element={<OrdersPage user={user} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/signup" element={<SignupPage onSignup={setUser} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
