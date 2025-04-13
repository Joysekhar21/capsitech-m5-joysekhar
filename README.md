# ✅ TODO APP

A full-featured TODO app built using the **MERN Stack** with **Tailwind CSS** for styling and **JWT Authentication** for secure access. It allows authenticated users to manage their tasks and profile, including updating their avatar image via **Cloudinary**.

🟢 **Live App:** [https://capsitech-m5-joysekhar.netlify.app](https://capsitech-m5-joysekhar.netlify.app)

---

## 📁 Tech Stack

- **Frontend:** React, Tailwind CSS, Context API, Formik
- **Backend:** Node.js, Express.js, MongoDB, Zod
- **Auth:** JWT
- **File Upload:** Multer + Cloudinary

---

## 🔐 Features

- 🔒 JWT-based Authentication
- ✅ Create, Read, Update, Delete Todos
- 👤 User Profile Management (update info, password, avatar)
- ☁️ Cloudinary integration for image uploads
- 🎨 Tailwind CSS for clean and responsive design
- ⚙️ Formik + Zod for robust form validation
- 📦 Context API for global state management

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)
- Cloudinary account (for image upload)


## 🔧 API Routes Documentation

### 🔐 **Authentication & User Routes**

| Method | Endpoint                          | Description                |
|--------|-----------------------------------|----------------------------|
| POST   | `/api/v1/user/create-account`     | Register a new user        |
| POST   | `/api/v1/user/login`              | Login and receive JWT      |
| GET    | `/api/v1/user/get-user`           | Get authenticated user info|
| PUT    | `/api/v1/user/updateDetails`      | Update user details        |
| PUT    | `/api/v1/user/changePassword`     | Change user password       |
| PUT    | `/api/v1/user/updateImage`        | Upload/update profile image|
| DELETE | `/api/v1/user/deleteImage`        | Delete profile image       |

---

### 📝 **TODO Routes**

| Method | Endpoint                     | Description         |
|--------|------------------------------|---------------------|
| GET    | `/api/v1/todo/get`           | Get all todos       |
| POST   | `/api/v1/todo/create`        | Create a new todo   |
| PUT    | `/api/v1/todo/update/:id`    | Update a todo by ID |
| DELETE | `/api/v1/todo/delete/:id`    | Delete a todo by ID |

> 🛡 All routes are **protected** and require a valid JWT token.

---

## 📸 Cloudinary Image Upload

- Handled via `Multer` in backend
- Uploaded to Cloudinary directly with secure URL stored in DB

