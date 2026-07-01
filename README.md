# ProcureFlow ERP

ProcureFlow ERP is a lightweight full-stack procurement and inventory management application built for the **SimpleGrid Software Development Intern Assignment**.

The application implements a complete Purchase Order workflow where users can create, approve, and receive purchase orders while automatically updating inventory.

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Hot Toast

### Storage

* In-memory JavaScript arrays (No database)

---

## Project Structure

```text
ProcureFlow/
│
├── backend/
├── frontend/
└── README.md
```

---

## How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Features

* View Products and Inventory
* View Vendors
* Create Purchase Orders
* Approve Purchase Orders
* Receive Purchase Orders
* Automatic Inventory Updates
* Manager approval for Purchase Orders above ₹50,000
* Centralized Error Handling
* Request Validation

---

## Business Rules

* Purchase Order total is calculated on the server.
* Purchase Orders follow the workflow:

```
Draft → Approved → Received
```

* Only Draft Purchase Orders can be approved.
* Only Approved Purchase Orders can be received.
* Receiving a Purchase Order updates inventory.
* Duplicate receive operations are prevented.
* Purchase Orders above ₹50,000 require manager approval.

---

## Design Decisions

* Followed a layered architecture (**Routes → Controllers → Services → Middleware**) to keep API handling, business logic, and validation separate.
* Implemented business rules in the service layer so they are enforced regardless of how the API is accessed.
* Used centralized error handling to provide consistent API responses.
* Used reusable React components to keep the frontend modular and maintainable.
* Stored all data in memory, as required by the assignment.

---

## Trade-offs

* Used in-memory storage instead of a database because the assignment explicitly required it. This means all data is reset when the server restarts.
* Manual testing was performed instead of automated tests due to the assignment scope and time constraints.

---

## Testing

The application was manually tested using **Postman** and the **React frontend**.

The following scenarios were verified:

* ✅ View Products and Inventory
* ✅ View Vendors
* ✅ Create Purchase Order
* ✅ View Purchase Orders
* ✅ Approve Purchase Order
* ✅ Receive Purchase Order
* ✅ Inventory updates after receiving goods
* ✅ Prevent approving non-draft Purchase Orders
* ✅ Prevent receiving non-approved Purchase Orders
* ✅ Prevent duplicate receive operations
* ✅ Manager approval rule for Purchase Orders above ₹50,000
* ✅ Request validation for invalid vendor, product, quantity, and unit price
* ✅ Error messages displayed correctly in the UI

---

## AI Usage

AI tools were used to speed up development by generating initial boilerplate code, suggesting project structure, and improving UI components.

All AI-generated code was reviewed, tested, and modified before being integrated into the project.

Examples of changes made after reviewing AI suggestions:

* Refactored the backend into a layered architecture (Controllers, Services, Middleware).
* Implemented centralized error handling using a custom `AppError` class.
* Added request validation middleware.
* Improved API response consistency.
* Fixed React component issues and state management bugs.
* Enhanced the UI with loading states, toast notifications, and reusable components.

---

## Author

**Sejal P**

Built as part of the **SimpleGrid Software Development Intern Assignment**.
