# 🏢 CoWorkSpace — Smart Co-Working Space Management

> A full-stack MERN application for discovering, booking, and managing co-working spaces with real-time availability powered by Socket.io.

![MERN](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101?style=for-the-badge&logo=socket.io)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)

---

## 🚀 Live Demo

| | Link |
|---|---|
| 🌐 **Frontend** | [coworking-space-azy9.vercel.app](https://coworking-space-azy9.vercel.app) |
| ⚙️ **Backend API** | [coworking-space-weld.vercel.app](https://coworking-space-weld.vercel.app) |
| 📁 **GitHub** | [github.com/Sarika-stack23/coworking-space](https://github.com/Sarika-stack23/coworking-space) |

---

## 👤 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 🔴 Admin | admin@coworking.com | admin123 |
| 🟡 Owner | owner@coworking.com | owner123 |
| 🟢 User | user@coworking.com | user123 |

---

## ✨ Features

- 🔐 **JWT Authentication** with role-based access (User / Owner / Admin)
- 🏢 **Browse Spaces** with smart filters (type, city, capacity, price)
- 📅 **Booking System** — book by hour, day, or month
- ⚡ **Real-Time Availability** using Socket.io
- 📊 **Admin Dashboard** with analytics and platform stats
- 👤 **User Dashboard** with booking history and spending
- 🔔 **Notifications** system for booking updates
- ✅ **Space Verification** by admin before listing
- 💬 **Inquiry System** for space queries
- 🌱 **Seed Data** — 5 premium spaces across Bangalore

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 19 + Vite |
| **Styling** | Tailwind CSS 3 |
| **Backend** | Node.js + Express.js 5 |
| **Database** | MongoDB Atlas |
| **Auth** | JWT (JSON Web Tokens) |
| **Real-time** | Socket.io |
| **Deployment** | Vercel (Frontend + Backend) |

---

## 📁 Project Structure 
coworking-space/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── auth/        # Login, Register
│   │   │   ├── user/        # Dashboard, Spaces, Bookings, Profile
│   │   │   └── admin/       # AdminDashboard
│   │   ├── components/
│   │   │   └── common/      # Navbar, ProtectedRoute
│   │   ├── context/         # AuthContext
│   │   └── utils/           # API helper (axios)
│   └── vercel.json
└── server/                  # Node.js Backend
├── models/              # MongoDB Models
├── controllers/         # Business Logic
├── routes/              # API Routes
├── middleware/          # Auth Middleware
├── seed.js              # Demo data seeder
└── vercel.json

---

## 🔧 Local Setup

### Backend
cd server
npm install
node seed.js
npm run dev

### Frontend
cd client
npm install
npm run dev

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | Public |
| POST | /api/auth/login | Login | Public |
| GET | /api/auth/profile | Get profile | Private |
| GET | /api/spaces | Get all spaces | Public |
| GET | /api/spaces/:id | Space detail | Public |
| POST | /api/spaces | Create space | Owner/Admin |
| POST | /api/bookings | Create booking | Private |
| GET | /api/bookings/my | My bookings | Private |
| PUT | /api/bookings/:id/cancel | Cancel booking | Private |
| POST | /api/inquiries | Send inquiry | Private |
| GET | /api/admin/stats | Platform stats | Admin |
| GET | /api/admin/users | All users | Admin |
| PUT | /api/admin/spaces/:id/verify | Verify space | Admin |

---

## 🗄️ MongoDB Models

| Model | Key Fields |
|-------|-----------|
| **User** | name, email, password, role, company |
| **Space** | name, type, location, capacity, pricing, amenities |
| **Booking** | userId, spaceId, bookingType, dates, totalAmount, status |
| **Inquiry** | userId, spaceId, message, reply, status |
| **Amenity** | name, icon, category |
| **Notification** | userId, title, message, type, isRead |

---

## 👩‍💻 Developer

**Sarika Jivrajika** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-Sarika--stack23-181717?style=flat&logo=github)](https://github.com/Sarika-stack23)

---

> Built with ❤️ using React.js + Node.js + MongoDB + Socket.io
