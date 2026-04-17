# User Management System (MERN Stack)

A full-stack **User Management System** built using the MERN stack with **Role-Based Access Control (RBAC)**, secure authentication, and admin dashboard features.

This project demonstrates real-world backend + frontend architecture, authentication flows, and authorization handling.

#  Features

##  Authentication
- User login with JWT
- Password hashing using bcrypt
- Protected routes

## Role-Based Access Control (RBAC)
- Admin
  - Full user management access
- Manager
  - View and update non-admin users
- User
  - Manage own profile only

## User Management
- Create users (Admin only)
- View all users (Admin/Manager)
- Update users
- Soft delete (deactivate users)
- Search users
- Filter by role and status
- Pagination

## Dashboard
- Total users count
- Active users count
- Admin count
- Quick actions

##  Audit System
- createdAt / updatedAt
- createdBy / updatedBy tracking
- User activity history support

##  Frontend Features
- Responsive UI
- Role-based navigation
- Toast notifications (no alerts)
- Clean dashboard UI
- Centered login & profile pages

---

#  Tech Stack

## Frontend
- React (Vite)
- React Router DOM
- Context API
- CSS (custom styling)

## Backend
- Node.js
- Express.js
- MongoDB (Local Compass / Atlas optional)
- JWT Authentication
- bcrypt.js
