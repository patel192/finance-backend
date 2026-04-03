# Finance Data Processing and Access Control Backend

## Project Overview

This project implements a backend system for managing financial records with role-based access control.
It provides secure APIs for user management, financial record operations, and dashboard analytics.

The system demonstrates backend design principles including:

* REST API architecture
* Role-based authorization
* Data validation
* Pagination and filtering
* Aggregation-based dashboard analytics
* Secure authentication using JWT

---

## Features

### User and Role Management

* User registration and login
* JWT-based authentication
* Role-based access control
* Active user validation

Supported roles:

* **Viewer** — can view records and dashboard data
* **Analyst** — can view records and analytics
* **Admin** — full access to manage records and users

---

### Financial Records Management

The system supports:

* Create financial records
* View records
* Update records
* Delete records
* Filter records
* Pagination
* Search functionality
* Date range filtering

Each record contains:

* Amount
* Type (income or expense)
* Category
* Date
* Notes
* CreatedBy user reference

---

### Dashboard Analytics

The backend provides aggregated data for dashboards, including:

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent transactions

---

## Technology Stack

Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose

Security:

* JSON Web Token (JWT)
* bcryptjs

Validation:

* express-validator

Development Tools:

* Nodemon
* Postman / Thunder Client

---

## Project Structure

```
finance-backend/
│
├── controllers/
│   ├── authController.js
│   ├── recordController.js
│   └── dashboardController.js
│
├── models/
│   ├── User.js
│   └── Record.js
│
├── routes/
│   ├── authRoutes.js
│   ├── recordRoutes.js
│   └── dashboardRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
│
├── config/
│   └── db.js
│
├── server.js
├── package.json
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```
git clone <repository-url>
cd finance-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create environment variables

Create a file named:

```
.env
```

Add the following:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d
```

### 4. Run the server

```
npm run dev
```

Server will start on:

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

Register user:

```
POST /api/auth/register
```

Login user:

```
POST /api/auth/login
```

---

### Records

Create record:

```
POST /api/records
```

Get records:

```
GET /api/records
```

Supports:

```
?page=1
&limit=10
&type=expense
&category=Food
&search=dinner
&startDate=2026-01-01
&endDate=2026-12-31
```

Update record:

```
PUT /api/records/:id
```

Delete record:

```
DELETE /api/records/:id
```

---

### Dashboard

Summary:

```
GET /api/dashboard/summary
```

Category totals:

```
GET /api/dashboard/category-totals
```

Recent activity:

```
GET /api/dashboard/recent
```

---

## Authorization Rules

```
Viewer:
  Read access only

Analyst:
  Read access to records and analytics

Admin:
  Full access to create, update, delete
```

---

## Validation

The system validates:

* Required fields
* Email format
* Password length
* Record data types
* Pagination parameters

Invalid requests return appropriate HTTP status codes.

---

## Error Handling

The backend includes:

* Centralized error middleware
* Proper HTTP status codes
* Structured error responses

Example:

```
{
  "success": false,
  "message": "Record not found"
}
```

---

## Assumptions

* Authentication uses JWT tokens
* MongoDB is used as the primary database
* Users are assigned roles during registration
* Pagination defaults to page 1 and limit 10
* All dates use ISO format

---

## Future Improvements

Potential enhancements:

* Unit testing
* Rate limiting
* Refresh tokens
* Soft delete functionality
* API documentation using Swagger

---

## Author

Backend Developer Intern Candidate
