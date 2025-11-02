"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Package, ShoppingBag, Calendar, CreditCard } from "lucide-react"

function OrdersPage({ user }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !user.token) {
      navigate('/login')
      return
    }

    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { ordersAPI } = await import("../services/api")
        const fetchedOrders = await ordersAPI.getAll()
        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="text-purple-600" size={32} />
        <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <Package size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
          <Link
            to="/books"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id || order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={20} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Ordered on {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Order #{order._id ? order._id.slice(-8).toUpperCase() : 'N/A'}
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <CreditCard size={20} className="text-gray-500" />
                      <span className="text-lg font-bold text-purple-600">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-lg font-semibold">₹{order.subtotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Shipping</p>
                    <p className="text-lg font-semibold">₹{order.shipping.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tax</p>
                    <p className="text-lg font-semibold">₹{order.tax.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Items ({order.items.length})</p>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item._id || item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/book/${item._id || item.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                          >
                            {item.title}
                          </Link>
                          <p className="text-gray-600 mb-1">{item.author}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-purple-600 font-bold">
                              ₹{item.price.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage

