import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">BookStore</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your one-stop destination for discovering and purchasing books from around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Browse Books
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Fiction
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Non-Fiction
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Science
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Biography
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and book updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-l focus:outline-none"
              />
              <button className="bg-purple-600 px-3 py-2 rounded-r hover:bg-purple-700 transition">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2025 BookStore. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
