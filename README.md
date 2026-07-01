# ProcureFlow ERP

A lightweight ERP Procurement & Inventory Management application built for the **SimpleGrid Software Development Intern Assignment**.

The application demonstrates a complete purchase order workflow where users can create purchase orders, approve them, receive goods, and automatically update inventory.

---

## Features

### Purchase Orders

* Create Purchase Orders
* Add multiple line items
* Automatic total calculation
* View all Purchase Orders
* View Purchase Order details
* Approve Purchase Orders
* Receive Purchase Orders

### Inventory

* View current inventory
* Automatic stock update after receiving goods
* Inventory dashboard with product statistics

### Business Rules

* Purchase Order total is calculated on the server.
* Purchase Orders follow the lifecycle:

```
Draft → Approved → Received
```

* Only **Draft** Purchase Orders can be approved.
* Only **Approved** Purchase Orders can be received.
* Receiving a Purchase Order updates inventory.
* Duplicate receiving is prevented.
* Purchase Orders above **₹50,000** require manager approval.

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Hot Toast

## Storage

* In-memory JavaScript Arrays (No Database)

---

# Project Structure

```
ProcureFlow
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── data
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd ProcureFlow
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/api/products`                    | Get all products          |
| GET    | `/api/vendors`                     | Get all vendors           |
| GET    | `/api/purchase-orders`             | Get all purchase orders   |
| GET    | `/api/purchase-orders/:id`         | Get single purchase order |
| POST   | `/api/purchase-orders`             | Create purchase order     |
| POST   | `/api/purchase-orders/:id/approve` | Approve purchase order    |
| POST   | `/api/purchase-orders/:id/receive` | Receive purchase order    |

---

# Application Workflow

```
Create Purchase Order
        │
        ▼
      Draft
        │
        ▼
     Approve
        │
        ▼
    Approved
        │
        ▼
 Receive Goods
        │
        ▼
Inventory Updated
        │
        ▼
    Received
```

---

# Design Decisions

* Used a layered architecture:

  * Routes
  * Controllers
  * Services
  * Middleware
* Business logic is separated from controllers.
* Implemented centralized error handling for consistent API responses.
* Added request validation middleware to validate incoming data.
* Used in-memory storage as required by the assignment instead of a database.
* React components are modular and reusable to improve maintainability.

---

# Error Handling

The application handles common invalid scenarios gracefully:

* Invalid Vendor
* Invalid Product
* Invalid Quantity
* Invalid Unit Price
* Purchase Order Not Found
* Approving a non-draft Purchase Order
* Receiving a non-approved Purchase Order
* Receiving an already received Purchase Order
* Manager approval required for Purchase Orders above ₹50,000

---

# AI Usage

AI tools were used to accelerate development by generating boilerplate code, suggesting component structures, and improving the UI.

All AI-generated code was carefully reviewed, tested, and modified before being integrated into the project.

Examples of improvements made after reviewing AI suggestions:

* Refactored business logic into a dedicated service layer.
* Implemented centralized error handling using a custom `AppError` class.
* Improved API response consistency.
* Fixed React component structure and state management issues.
* Enhanced UI with reusable components and loading/error states.

---

# Future Improvements

* Database integration (PostgreSQL/MySQL)
* JWT Authentication
* Role-based Access Control
* Search and Filtering
* Pagination
* Dashboard Analytics
* Docker Deployment
* Unit and Integration Testing

---

# Author

**Sejal P**

Software Engineering Intern Candidate

Built as part of the **SimpleGrid Software Development Intern Assignment**.
