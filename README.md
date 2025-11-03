# 🛍️ E-Commerce REST API

A full-featured e-commerce REST API built with Node.js, Express, and MongoDB.

## ✨ Features

- ✅ User Authentication & Authorization (JWT)
- ✅ Password Hashing with bcrypt
- ✅ Role-based Access Control (Customer/Admin)
- ✅ Protected Routes
- ✅ Error Handling
- ✅ MongoDB Integration
- 🚧 Product Management (Coming Soon)
- 🚧 Shopping Cart (Coming Soon)
- 🚧 Order Processing (Coming Soon)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aminekaddouri/ecommerce-api.git
cd ecommerce-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

## 🧪 Testing with Postman/Thunder Client

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🏗️ Project Structure

```
ecommerce-api/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
├── .env                # Environment variables
├── .gitignore
├── server.js           # Entry point
└── package.json
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: Mongoose schema validation

## 📝 License

MIT

## 👤 Author

Amine Kaddouri - https://github.com/Aminekaddouri

---

**Phase 1 Complete!** ✅ Authentication & Authorization implemented.