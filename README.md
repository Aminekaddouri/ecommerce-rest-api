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
- ✅ Sorting (Price, Date, Name, Rating)
- ✅ Pagination
- ✅ Product Reviews & Ratings
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Email Notifications
- ✅ Password Reset
- ✅ Interactive API Documentation (Swagger)
- ✅ Error Handling
- ✅ MongoDB Integration
- ✅ ESLint + Prettier (Code Quality)

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

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@yourapp.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

5. **Start the server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

6. **Access API Documentation:**
```
http://localhost:5000/api-docs
```
Interactive Swagger UI with all endpoints, examples, and "Try it out" functionality!

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

---

## 📚 API Documentation

**Interactive documentation available at:** `http://localhost:5000/api-docs`

Features:
- 🧪 **Try It Out** - Test endpoints directly from browser
- 📖 **Complete Reference** - All endpoints documented
- 🔐 **Authentication** - JWT bearer token support
- 📝 **Request/Response Examples** - Clear examples for every endpoint
- 🏷️ **Organized by Tags** - Easy navigation

### Quick Links:
- **Authentication:** Register, Login, Password Reset
- **Products:** CRUD, Search, Filter, Sort
- **Reviews:** Create, Read, Update, Delete
- **Cart:** Add, Update, Remove Items
- **Orders:** Create, Track, Manage
- **Upload:** Image Management


---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |
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

### Reviews

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/products/:productId/reviews` | Create product review | Private |
| GET | `/api/products/:productId/reviews` | Get product reviews | Public |
| GET | `/api/reviews/:id` | Get single review | Public |
| GET | `/api/reviews/my-reviews` | Get my reviews | Private |
| PUT | `/api/reviews/:id` | Update review | Private (Owner) |
| DELETE | `/api/reviews/:id` | Delete review | Private (Owner/Admin) |

### Shopping Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:itemId` | Update cart item quantity | Private |
| DELETE | `/api/cart/:itemId` | Remove item from cart | Private |
| DELETE | `/api/cart` | Clear entire cart | Private |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order from cart | Private |
| GET | `/api/orders/my-orders` | Get user's orders | Private |
| GET | `/api/orders/:id` | Get single order | Private (Owner/Admin) |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/pay` | Update order to paid | Private (Owner/Admin) |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| PUT | `/api/orders/:id/cancel` | Cancel order | Private (Owner/Admin) |

### Image Upload

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/upload/single` | Upload single image | Admin |
| POST | `/api/upload/multiple` | Upload multiple images (max 5) | Admin |
| DELETE | `/api/upload/:public_id` | Delete image | Admin |

---

## 🌟 Key Features

### Authentication & Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Customer/Admin)
- Password reset via email with secure tokens
- Welcome emails for new users
- Protected routes middleware

### Product Management
- Complete CRUD operations
- Multiple image uploads (max 5 per product)
- Image storage with Cloudinary
- 12 product categories
- Stock management
- Virtual populate for reviews

### Advanced Search & Filtering
- Keyword search (name and description)
- Category filtering
- Price range filtering (min/max)
- Multiple sort options (price, date, name, rating)
- Pagination with customizable limits
- Dynamic query building

### Reviews & Ratings
- Star ratings (1-5)
- Text reviews with 500 character limit
- One review per user per product
- Automatic rating calculation
- Review aggregation pipeline
- Cascade delete on product removal

### Shopping Cart
- Add/remove items with stock validation
- Update quantities
- Auto-calculate totals (subtotal, tax, shipping)
- Price snapshot (preserves agreed price)
- Cart persistence per user
- Duplicate item prevention

### Order Management
- Create orders from cart
- Multiple order statuses (Pending → Processing → Shipped → Delivered)
- Order cancellation with stock restoration
- Payment tracking
- Shipping address storage
- Order history

### Email Notifications
- Welcome email on registration
- Order confirmation with details
- Order status update emails
- Password reset emails
- Beautiful HTML templates
- Dynamic content generation

### API Documentation
- Interactive Swagger UI
- Try endpoints directly in browser
- Complete request/response examples
- Authentication support
- Organized by categories
- Auto-generated from code

### Code Quality
- ESLint with Airbnb style guide
- Prettier for consistent formatting
- Pre-commit hooks
- Error handling middleware
- Input validation
- Clean code architecture

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

<!-- 📖 **For more examples, see [API_EXAMPLES.md](API_EXAMPLES.md)** -->

---

## 🏗️ Project Structure

```
ecommerce-rest-api/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   ├── cloudinary.js   # Cloudinary setup
│   │   ├── email.js        # Email transporter
│   │   └── swagger.js      # Swagger/OpenAPI config
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── uploadController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── multerErrorHandler.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   └── utils/               # Utility functions
│       ├── generateToken.js
│       ├── sendEmail.js
│       ├── emailTemplates.js
│       └── seedAdmin.js
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore
├── .eslintrc.json          # ESLint configuration
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
- **Email Service:** Nodemailer (Gmail SMTP)
- **API Documentation:** Swagger/OpenAPI 3.0
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
| `EMAIL_HOST` | SMTP host (e.g., smtp.gmail.com) | Yes |
| `EMAIL_PORT` | SMTP port | No (default: 587) |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASSWORD` | Email password/app password | Yes |
| `EMAIL_FROM` | From email address | Yes |
| `FRONTEND_URL` | Frontend URL for email links | Yes |

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
- [x] Password reset via email
- [x] Product CRUD operations
- [x] Image upload & management (Cloudinary)
- [x] Advanced search & filtering
- [x] Pagination & sorting
- [x] Product reviews & ratings
- [x] Shopping cart management
- [x] Order management & tracking
- [x] Email notifications (Welcome, Order confirmation, Status updates)
- [x] Interactive API documentation (Swagger)
- [x] Code quality tools (ESLint + Prettier)

### Future Enhancements 📋
- [ ] Payment integration (Stripe/PayPal)
- [ ] Refresh tokens
- [ ] Admin dashboard analytics
- [ ] API rate limiting
- [ ] Redis caching
- [ ] Unit & integration tests
- [ ] Wishlist feature
- [ ] Discount codes & coupons
- [ ] Product variants (size, color)
- [ ] Address book

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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