# 📚 Online Book Store

A full-stack e-commerce bookstore application built with React, Node.js, Express, and MongoDB. Browse, search, and purchase books with a modern, responsive UI.

![Tech Stack](https://img.shields.io/badge/React-18.3.1-blue)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-green)
![Tech Stack](https://img.shields.io/badge/MongoDB-8.19.2-green)
![Tech Stack](https://img.shields.io/badge/TailwindCSS-3.4.1-blue)

## 🌟 Features

### 🏠 User Features
- **Browse Books**: Browse through a collection of 35+ books across multiple categories
- **Search & Filter**: Search by title/author, filter by category, and sort by price, rating, or date
- **Book Details**: Detailed view with ISBN, publisher, pages, year, and descriptions
- **Shopping Cart**: Add/remove items, adjust quantities, and manage your cart
- **Buy Now**: Quick purchase option that redirects to checkout
- **User Authentication**: Secure login and registration system
- **Order Management**: View your order history
- **Responsive Design**: Beautiful UI that works on all devices

### 📦 Book Categories
- Fiction
- Non-Fiction
- Science Fiction
- Biography
- Mystery
- Fantasy
- Self-Help
- Psychology
- Historical Fiction
- And more...

### 🛠️ Technical Features
- **RESTful API**: Clean, well-structured backend API
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Database**: Scalable NoSQL database
- **State Management**: React hooks and localStorage
- **Responsive UI**: Tailwind CSS for modern styling
- **API Integration**: Seamless frontend-backend communication

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Online-Book-Store.git
   cd Online-Book-Store
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_jwt_key
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```
   
   For MongoDB Atlas:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
   ```
   
   For local MongoDB:
   ```
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```
   This will populate your database with 35+ books.

5. **Start the Backend Server**
   ```bash
   npm start       # Production
   npm run dev     # Development with auto-reload
   ```
   Backend runs on `http://localhost:5000`

6. **Set up the Frontend**
   
   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

7. **Configure Frontend Environment (Optional)**
   
   Create a `.env` file in the `frontend` directory if your backend runs on a different URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

8. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
Online-Book-Store/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── bookController.js  # Book CRUD operations
│   │   │   ├── cartController.js  # Cart operations
│   │   │   ├── orderController.js # Order processing
│   │   │   └── userController.js  # User authentication
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── Book.js            # Book schema
│   │   │   ├── Cart.js            # Cart schema
│   │   │   ├── Order.js           # Order schema
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   ├── bookRoutes.js      # Book endpoints
│   │   │   ├── cartRoutes.js      # Cart endpoints
│   │   │   ├── orderRoutes.js     # Order endpoints
│   │   │   └── userRoutes.js      # User endpoints
│   │   └── scripts/
│   │       └── seedBooks.js       # Database seeding script
│   ├── server.js                  # Express server setup
│   ├── package.json
│   └── .env                       # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BookCard.jsx       # Book card component
    │   │   ├── Footer.jsx         # Footer component
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   └── SearchBar.jsx      # Search component
    │   ├── pages/
    │   │   ├── BookDetailsPage.jsx # Single book details
    │   │   ├── BooksPage.jsx      # All books listing
    │   │   ├── CartPage.jsx       # Shopping cart
    │   │   ├── HomePage.jsx       # Landing page
    │   │   ├── LoginPage.jsx      # User login
    │   │   ├── OrdersPage.jsx     # Order history
    │   │   └── SignupPage.jsx     # User registration
    │   ├── services/
    │   │   └── api.js             # API service layer
    │   ├── App.jsx                # Main app component
    │   └── main.jsx               # React entry point
    ├── public/                    # Static assets
    ├── package.json
    ├── vite.config.js             # Vite configuration
    ├── tailwind.config.js         # Tailwind configuration
    └── .env                       # Frontend environment variables
```

## 🔌 API Endpoints

### Books
- `GET /api/books` - Get all books (with filters)
- `GET /api/books/:id` - Get single book by ID
- `GET /api/books/category/:category` - Get books by category

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:bookId` - Update cart item quantity
- `DELETE /api/cart/:bookId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order

## 🎨 Key Pages

### Home Page (`/`)
- Hero section with call-to-action
- Category browsing
- Featured books carousel
- Service highlights

### Books Page (`/books`)
- Grid view of all books
- Search functionality
- Category filters
- Sort options (price, rating, newest)
- Price range slider

### Book Details Page (`/book/:id`)
- Large book image with discount badge
- Complete book information
- ISBN, publisher, pages, year
- Quantity selector
- **Buy Now** button (redirects to cart)
- **Add to Cart** button
- Related books section
- Customer reviews

### Shopping Cart (`/cart`)
- Cart items list
- Quantity controls
- Price calculations
- Proceed to checkout
- Order summary

### Orders Page (`/orders`)
- Order history
- Order status
- Order details

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router 6.26** - Client-side routing
- **Vite** - Build tool
- **Tailwind CSS 3.4.1** - Styling framework
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.19.2** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

## 🎯 Usage

1. **Browse Books**: Navigate to the books page to see all available books
2. **Search**: Use the search bar to find specific books
3. **Filter**: Click on categories or use the sidebar filters
4. **View Details**: Click on any book card to see full details
5. **Add to Cart**: Use the "Add to Cart" button or quick-add from the book grid
6. **Buy Now**: Click "Buy Now" for immediate checkout
7. **Checkout**: Review your cart and proceed to checkout (requires login)
8. **Track Orders**: View your order history after checkout

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/
# Response: API is running...
```

### Get All Books
```bash
curl http://localhost:5000/api/books
```

### Get Single Book
```bash
curl http://localhost:5000/api/books/:bookId
```

