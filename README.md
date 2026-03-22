# 🏥 Medicare - Hospital Management System (Backend)

A production-ready Hospital Management System backend built using **Node.js, Express, MongoDB**, following a **Layered Architecture (MVC + Service Layer)** with a strong focus on **security, scalability, and real-world workflows**.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based Authentication (Access + Refresh Token)
* HTTP-only secure cookie storage
* Auto access token regeneration
* Email verification system
* Forgot & Reset Password via secure tokens
* Account lock after 3 failed attempts
* Auto unblock after 24 hours (Cron Job)
* Role-Based Authorization (User, Doctor, Admin)
* Password hashing using bcrypt
* Rate Limiting & Secure Middleware
* Centralized Error Handling & API Response

---

### 🏥 Appointment Management

* Book, Update, Cancel, Reschedule Appointments
* Appointment lifecycle tracking:

  * Booked → Confirmed → Completed / Missed / Cancelled
* Token number generation after doctor approval
* Doctor approval/rejection workflow
* Real-time updates using Socket.io
* Online (Razorpay) & Offline payment support

---

### 👨‍⚕️ Doctor Management

* Admin-controlled doctor onboarding
* Email verification & temporary credentials
* Profile submission & approval system
* Doctor verification badge
* Role rollback (Doctor → User)
* Soft delete with data consistency

---

### 🏢 Department Management

* CRUD operations for departments
* Data integrity rules:

  * Cannot delete if linked with doctor/appointment
* Soft delete with audit history

---

### 💳 Payment System

* Razorpay integration
* Payment verification & tracking
* Invoice generation (PDF)
* Payment history (Admin & User)

---

### 🔔 Notifications & Realtime

* Socket.io real-time notifications
* Web Push Notifications
* Admin alerts on new registrations

---

### 📊 Admin Dashboard & Reports

* System statistics & analytics
* Appointment filtering & tracking
* Export data:

  * PDF
  * CSV
  * Excel

---

### ⚙️ System Automation

* Cron Jobs:

  * Auto unblock users
  * Remove unverified accounts
* Soft delete & reactivation logic

---

## 🏗️ Architecture

This project follows a **Layered Architecture**:

Controller → Service → Model

* **Controllers** → Handle request/response
* **Services** → Business logic
* **Models** → Database schema
* **Middlewares** → Auth, validation, rate limiting
* **Utils** → Centralized response & messages

---

## 📁 Project Structure (Simplified)

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── utils/
├── cron/
├── socket/
├── config/
```

---

## 🔥 Key Highlights

* Centralized API response (`utils/respond.js`)
* Centralized messages (`utils/messages`)
* Production-level security practices
* Scalable modular service structure
* Real-time + async system design

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

EMAIL_USER=your_email
EMAIL_PASS=your_password

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret

CLIENT_URL=http://localhost:5173
```

---

## 🛠️ Installation

```bash
# Clone repo
git clone <repo-url>

# Install dependencies
npm install

# Run server
npm run dev
```

---

## 📡 API Design

* RESTful API structure
* Role-based protected routes
* Standardized responses



---

## 🧠 Future Improvements

* CI/CD pipeline
* Advanced caching (Redis)

---

## 👨‍💻 Author

Developed as a full-stack production-level project focusing on real-world healthcare workflows.

---
