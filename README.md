
# 💇‍♀️ Salon Booking Service App

**Live Demo:** https://frontend-capstone-dthy.vercel.app/  
**Repo Path:** `frontend-campstone/salon-booking-service`

A modern salon appointment booking web app that reduces waiting time by letting customers view services and book a time slot in advance—while enforcing real-world rules like authentication, working hours, duplicate booking prevention, and public-holiday blocking.

---

##  What This App Does

Instead of walk-ins and long queues, customers can:

- Browse salon services (Haircut, Hair Treatment, Nail Service)
- View **estimated price** and **estimated duration**
- Choose a **date** and **time**
- Book an appointment (only when logged in)
- View booking history
- Cancel a booking (removes it from the API)

The app focuses on a smooth salon flow:

> Customers arrive at their scheduled time, get serviced immediately, and leave—no waiting, no confusion.

---

##  Authentication Rules (Important)

Booking is protected behind authentication:

- A user can browse services without an account.
- **A user must register and log in before booking.**
- If a user attempts to book while not logged in:
  - The app blocks submission
  - Shows an alert: **"Please login"**
  - Also prompts the user that they must log in before proceeding

After login:
- A welcome alert appears
- Clicking **OK** redirects the user to the **Home** page
- The user’s **name** appears in the navbar
- A **Logout** option becomes visible

After logout:
- A confirmation alert appears
- Clicking **OK** redirects to **Home**
- The username disappears
- Only **Login** is visible again

---

##  Booking Validation & Business Rules

The booking system enforces multiple checks to avoid conflicts and unrealistic scheduling:

### 1) Duplicate Booking Prevention
- If the user tries to book a service on the **same date and same time** as an existing booking:
  - The app displays an error and prevents booking

### 2) Working Hours Enforcement
- If the user tries to book when the salon is **closed**:
  - On a **weekday** during closed hours → error appears
  - On a **weekend** during closed hours → error appears

### 3) Public Holiday Blocking (South Africa)
- If the selected date is a **South African public holiday**:
  - Booking is blocked
  - An error is shown
  - The holiday name/details are displayed so the user understands why it’s blocked

### 4) Submit Behavior (Not Logged In)
- If the user presses **Submit** without being logged in:
  - Booking does not proceed
  - Alert shows: **"Please login"**

### 5) Successful Booking Redirect
- After a successful booking:
  - The user is redirected to **Booking History**

### 6) Cancel Booking
- If the user cancels a booking:
  - The booking is deleted from the API (MockAPI)
  - Booking history updates accordingly

---

##  Tech Stack

- **React.js** — UI development
- **Zustand** — global state management
- **MockAPI** — simulated backend for:
  - Services
  - Users
  - Bookings
- **South Africa Public Holiday Date API** — prevents booking on public holidays
- **Vercel** — deployment

---

## Project Structure (High Level)

### Components
- `Navbar.jsx` — navigation + user status (login/logout + username)
- `Footer.jsx` — footer layout
- `ServiceCard.js` — service display (name, price, duration)
- `BookingForm.jsx` — booking creation + validation rules + auth checks
- `BookingHistory.jsx` — list of bookings + cancel/delete functionality
- `LoginForm.js` — login flow, alerts, redirect behavior
- `RegisterForm.js` — registration flow

### Pages
- `Home`
- `HairCut`
- `Hair Treatment`
- `NailService`

Each service page shows available services with pricing and duration.

### State Management
- `userStore.js` (Zustand)
  - authentication state (logged in/out)
  - user info (display name, etc.)
  - bookings state and related actions

---

##  Backend (MockAPI)

This project uses **MockAPI** to simulate a backend and enable CRUD operations:

- Create and fetch users
- Create, fetch, and delete bookings
- Fetch services

This makes the project fully functional without requiring a custom backend server.

---

## Public Holidays Integration

The app integrates a **South African Public Holiday API** to:

- Detect public holidays automatically
- Block booking on those dates
- Display an error including holiday details for clarity

This enforces realistic business scheduling.

---

## User Flow (End-to-End)

1. User opens the app and browses services.
2. If they want to book, they must **register** and **log in**.
3. After login, a welcome alert appears; user confirms and returns home.
4. User chooses a service → selects date/time.
5. App validates:
   - logged-in status
   - public holiday check
   - working hours check (weekday/weekend)
   - duplicate booking check (same date + time)
6. If valid → booking saved in MockAPI.
7. User is redirected to **Booking History**.
8. User can cancel a booking → it is deleted from MockAPI.

---

## Key Features Checklist

- Register & Login
- Protected booking (must be logged in)
- Browse services with duration + price
-  Booking creation with validation
-  Prevent duplicate bookings (same date/time)
-  Block bookings on South African public holidays
-  Working-hours booking restrictions
-  Booking History page
-  Cancel booking (deletes from API)
-  Responsive UI

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/frontend-campstone.git

# Go to the project directory
cd frontend-campstone/salon-booking-service

# Install dependencies
npm install

# Start the dev server
npm run dev
Deployment
Deployed with Vercel:
https://frontend-capstone-dthy.vercel.app/

 Future Improvements
Admin dashboard (manage services, staff schedules, bookings)
Real-time slot availability (avoid race conditions)
Email/SMS booking confirmations
Payment integration
Choose stylist/technician (staff selection)
Calendar view for appointments
Better form validation messages (inline + accessible)
Author
Capstone Frontend Project — built for learning, demonstration, and portfolio purposes.

📄 License
Educational / demonstration use.
