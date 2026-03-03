# AI Interview Report & Resume Generator

A full-stack MERN application that allows users to upload resumes, generate AI-powered interview feedback reports, and download structured resume PDFs.

## 🚀 Features

- 🔐 JWT Authentication (Login/Register/Logout)
- 🚫 Token Blacklisting for secure logout
- 🛡 Protected Routes with Middleware
- 📂 Resume Upload using Multer
- 🤖 AI-powered Interview Report Generation
- 📄 Resume PDF Generation using Puppeteer
- ⚛️ React Frontend with Context API & Custom Hooks
- 🌐 RESTful API Architecture
- 🗂 MongoDB Atlas Database Integration

---

## 🏗 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Context API
- Axios
- Custom Hooks

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)
- Puppeteer (PDF Generation)
- Zod (Schema Validation)

---

## 🧠 Architecture Overview

1. User registers/logs in.
2. JWT token is issued and stored securely.
3. Protected routes validate user via middleware.
4. User uploads resume → AI service processes data.
5. AI generates structured interview report.
6. Report is stored in MongoDB.
7. Resume PDF is generated server-side using Puppeteer.
8. User can download generated PDF.

---

## 🔐 Authentication Flow

Register → JWT issued
Login → Token stored in HTTP-only cookie
Middleware verifies token
Logout → Token added to blacklist

---

## 📄 PDF Generation Flow

AI Response → HTML Template → Puppeteer → PDF → Download

---

## 🎯 Key Learning Outcomes

- Implemented secure JWT authentication with token blacklisting
- Designed scalable React architecture using Context API and custom hooks
- Integrated AI services into a production-style workflow
- Built a server-side PDF generation pipeline using Puppeteer
- Structured REST APIs with proper separation of concerns
- Managed full request lifecycle from frontend to database

---

<!-- mongodb+srv://nesarikartejas10_db_user:tejas@1718@cluster0.ebssjgy.mongodb.net/?appName=Cluster0 -->
