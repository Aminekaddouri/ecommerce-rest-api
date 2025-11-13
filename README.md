# 🛍️ E-Commerce REST API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)](https://expressjs.com/)

A full-featured, production-ready e-commerce REST API built with Node.js, Express, and MongoDB. Features JWT authentication, role-based authorization, product management, image uploads, advanced search & filtering, and more.

---

## ✨ Features

- ✅ User Authentication & Authorization (JWT)
- ✅ Password Hashing with bcrypt
- ✅ Role-based Access Control (Customer/Admin)
- ✅ Protected Routes
- ✅ Product Management (CRUD)
- ✅ Image Upload (Cloudinary)
- ✅ Multiple Image Support (max 5 per product)
- ✅ Advanced Search & Filtering
- ✅ Price Range Filtering
- ✅ Category Filtering
- ✅ Sorting (Price, Date, Name)
- ✅ Pagination
- ✅ Error Handling
- ✅ MongoDB Integration
- ✅ ESLint + Prettier (Code Quality)
- 🚧 Product Reviews & Ratings (Coming Soon)
- 🚧 Shopping Cart (Coming Soon)
- 🚧 Order Processing (Coming Soon)
- 🚧 Payment Integration (Coming Soon)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Aminekaddouri/ecommerce-rest-api.git
cd ecommerce-rest-api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your configuration:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Start the server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

---

## 🧹 Code Quality

### Linting
```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting
```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (with filters) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create new product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Image Upload

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/upload/single` | Upload single image | Admin |
| POST | `/api/upload/multiple` | Upload multiple images (max 5) | Admin |
| DELETE | `/api/upload/:public_id` | Delete image | Admin |

---

## 🔍 Advanced Product Filtering

The GET `/api/products` endpoint supports powerful filtering, searching, sorting, and pagination.

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `keyword` | String | Search in name and description | `?keyword=laptop` |
| `category` | String | Filter by category | `?category=Laptops` |
| `minPrice` | Number | Minimum price filter | `?minPrice=500` |
| `maxPrice` | Number | Maximum price filter | `?maxPrice=2000` |
| `sort` | String | Sort results | `?sort=-price` |
| `page` | Number | Page number (default: 1) | `?page=2` |
| `limit` | Number | Results per page (default: 10) | `?limit=20` |

### Sort Options

| Value | Description |
|-------|-------------|
| `price` | Price: Low to High |
| `-price` | Price: High to Low |
| `name` | Name: A to Z |
| `-name` | Name: Z to A |
| `createdAt` | Oldest First |
| `-createdAt` | Newest First (default) |
| `ratings` | Lowest Rated First |
| `-ratings` | Highest Rated First |

### Filter Examples

**Basic Search:**
```
GET /api/products?keyword=laptop
```

**Category Filter:**
```
GET /api/products?category=Electronics
```

**Price Range:**
```
GET /api/products?minPrice=500&maxPrice=2000
```

**Sorting:**
```
GET /api/products?sort=-price
```

**Pagination:**
```
GET /api/products?page=2&limit=20
```

**Combined Filters:**
```
GET /api/products?keyword=gaming&category=Laptops&minPrice=1000&maxPrice=3000&sort=-price&page=1&limit=10
```

### Response Format

```json
{
  "success": true,
  "count": 10,
  "page": 1,
  "totalPages": 5,
  "totalProducts": 47,
  "data": [...]
}
```

---

## 🧪 Testing with Postman/Thunder Client

### Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Product with Images (Admin)
```http
POST http://localhost:5000/api/products
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: multipart/form-data

name: MacBook Pro
description: Powerful laptop for professionals
price: 1999.99
category: Laptops
stock: 15
images: [file1.jpg]
images: [file2.jpg]
images: [file3.jpg]
```

📖 **For more examples, see [API_EXAMPLES.md](API_EXAMPLES.md)**

---

## 🏗️ Project Structure

```
ecommerce-rest-api/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── cloudinary.js   # Cloudinary setup
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── uploadController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── multerErrorHandler.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── uploadRoutes.js
│   └── utils/               # Utility functions
│       ├── generateToken.js
│       └── seedAdmin.js
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore
├── eslint.config.mjs         # ESLint configuration
├── .prettierrc             # Prettier configuration
├── server.js               # Entry point
├── package.json
├── README.md
├── API_EXAMPLES.md         # Detailed API examples
├── TESTING_GUIDE.md        # Complete testing guide
└── PROJECT_STATUS.md       # Development progress
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **File Upload:** Multer + Cloudinary
- **Validation:** Mongoose schema validation
- **Code Quality:** ESLint + Prettier (Airbnb style guide)

---

## 🌟 Available Categories

- Electronics
- Cameras
- Laptops
- Accessories
- Headphones
- Food
- Books
- Clothes/Shoes
- Beauty/Health
- Sports
- Outdoor
- Home

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 30d) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

---

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (only in development)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Protected routes middleware
- ✅ Role-based authorization
- ✅ Input validation
- ✅ File type validation
- ✅ File size limits (5MB per image)
- ✅ CORS enabled
- ✅ NoSQL injection prevention (Mongoose)

---

## 🎯 Roadmap

### Completed ✅
- [x] User authentication & authorization
- [x] Product CRUD operations
- [x] Image upload & management
- [x] Advanced search & filtering
- [x] Pagination
- [x] Sorting

### In Progress 🚧
- [ ] Product reviews & ratings
- [ ] Shopping cart
- [ ] Order management

### Planned 📋
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Password reset
- [ ] Refresh tokens
- [ ] Admin dashboard
- [ ] API rate limiting
- [ ] Redis caching
- [ ] Unit & integration tests
- [ ] API documentation (Swagger)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Amine Kaddouri**

- GitHub: [@Aminekaddouri](https://github.com/Aminekaddouri)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [JWT](https://jwt.io/) - Authentication
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Amine Kaddouri](https://github.com/Aminekaddouri)

</div>