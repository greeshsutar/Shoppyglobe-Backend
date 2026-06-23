github --https://github.com/greeshsutar/Shoppyglobe-Backend
markdown# ShoppyGlobe Backend

REST API for the ShoppyGlobe e-commerce application built with Node.js, Express, and MongoDB.

**Frontend Repo:** https://github.com/greeshsutar/ShoppyGlobe

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Axios
- Dotenv

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/greeshsutar/Shoppyglobe-Backend.git
cd Shoppyglobe-Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5500
```

### 4. Run the server
```bash
npm start
```

Server runs on `http://localhost:5500`

---

## Seed Products
POST /products/seed

Fetches 30 products from DummyJSON API and saves them to MongoDB. Run once only.

---

## API Routes

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product by ID |
| POST | `/products/seed` | Seed products from DummyJSON |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login and get JWT token |

### Cart (Protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get user's cart |
| POST | `/cart` | Add item to cart |
| PUT | `/cart/:id` | Update item quantity |
| DELETE | `/cart/:id` | Remove item from cart |

---

## Authentication

All cart routes are protected. Pass the JWT token in the Authorization header:
Authorization: Bearer <your_token>

---

## Project Structure
├── auth/

│   └── authenticationmiddlware.js

├── configure/

│   └── User.configure.js

├── Controller/

│   ├── Cart.controller.js

│   ├── Product.controller.js

│   └── User.controller.js

├── model/

│   ├── Cart.model.js

│   ├── Product.model.js

│   └── User.model.js

├── routes/

│   └── Product.route.js

├── .env

└── Server.js

---

## Error Handling

All routes include error handling with appropriate HTTP status codes:
- `400` — Bad request / validation error
- `401` — Unauthorized
- `404` — Resource not found
- `500` — Internal server error