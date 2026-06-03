# 🏢 Smart Co-Working Space Management

A full-stack MERN application for managing co-working spaces with real-time seat availability using Socket.io.

## 🚀 Live Demo
- Frontend: (add after deployment)
- Backend: (add after deployment)

## 👤 Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@coworking.com | admin123 |
| Owner | owner@coworking.com | owner123 |
| User | user@coworking.com | user123 |

## ✨ Features
- JWT Authentication with role-based access (User/Owner/Admin)
- Browse co-working spaces with filters (type, city)
- Book desks by hour, day, or month
- Real-time seat availability with Socket.io
- Admin dashboard with analytics
- Manage bookings, users, and spaces
- Seed data with 5 spaces across Bangalore

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| Real-time | Socket.io |
| Deployment | Vercel |

## 📁 Project Structure
coworking-space/
├── client/          # React Frontend
│   ├── src/
│   │   ├── pages/   # Home, Spaces, Dashboard, Admin
│   │   ├── components/
│   │   ├── context/ # Auth Context
│   │   └── utils/   # API helper
└── server/          # Node.js Backend
    ├── models/      # MongoDB Models
    ├── controllers/ # Business Logic
    ├── routes/      # API Routes
    └── middleware/  # Auth Middleware

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

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/spaces | Get all spaces |
| GET | /api/spaces/:id | Get space detail |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/my | My bookings |
| PUT | /api/bookings/:id/cancel | Cancel booking |
| GET | /api/admin/stats | Admin analytics |
| GET | /api/admin/users | All users |
| PUT | /api/admin/spaces/:id/verify | Verify space |

## 🗄️ MongoDB Models
- User - name, email, password, role, company
- Space - name, type, location, capacity, pricing, amenities
- Booking - userId, spaceId, dates, amount, status
- Inquiry - userId, spaceId, message, reply
- Amenity - name, icon, category
- Notification - userId, title, message, type

## 👩‍💻 Developer
Sarika Jivrajika
MERN Stack Intern @ Unified Mentor
Project 2 - Smart Co-Working Space Management
Domain - Real Estate
