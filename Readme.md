# 🎧 VibeTalk

**VibeTalk** is a full-stack real-time communication platform where users can join rooms and interact live.
It uses **OTP-based authentication**, **JWT**, and **WebSockets** to create a seamless and secure experience.

---

## 🚀 Features

* 🔐 **Email OTP Authentication**
* 👤 **User Onboarding (Name + Avatar)**
* 🏠 **Create & Join Rooms**
* 👥 **Live User Presence (Real-time)**
* 🚪 **Leave & Delete Rooms (Host Control)**
* ⚡ **WebSocket-based real-time updates**

---

## 🧱 Tech Stack

### 🔹 Frontend

* React.js
* Tailwind CSS
* React Router

### 🔹 Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (Neon DB)

### 🔹 Realtime

* Socket.IO

### 🔹 Authentication

* JWT (JSON Web Tokens)
* Nodemailer (Email OTP)

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── config/
│   ├── socket.js
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication Flow

1. User enters email
2. OTP is sent via email
3. User verifies OTP
4. If new → onboarding
5. If existing → dashboard

---

## 🏠 Room Flow

* Create Room (host assigned)
* Join Room (authenticated users only)
* View live users in room
* Leave Room
* Delete Room (host only)

---

## ⚡ Realtime System

* Socket authentication using JWT
* Join/Leave room events
* Live user tracking
* Real-time updates to all participants

---

## 🛠️ Installation

### 1️⃣ Clone the repo

```
git clone https://github.com/your-username/vibetalk.git
cd vibetalk
```

---

### 2️⃣ Backend setup

```
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run:

```
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* `POST /auth/send-otp`
* `POST /auth/verify-otp`
* `POST /auth/complete-profile`

### User

* `GET /user/me`

### Room

* `POST /room/create`
* `POST /room/join`
* `GET /room/users/:roomId`
* `POST /room/leave/:roomId`
* `DELETE /room/:roomId`

---

## 🔮 Future Improvements

* 🎤 WebRTC voice integration
* 🔄 Refresh token system
* 📩 Room invites
* 🎨 UI/UX enhancements
* 📊 Analytics & activity tracking

---

## 💡 Inspiration

Inspired by real-time communication platforms like
Discord and
Clubhouse

---

## 👨‍💻 Author

**Ashmit Mishra**

---

## ⭐ Contribute

Feel free to fork, improve, and create pull requests 🚀

---

## 📜 License

This project is open-source and available under the MIT License.
