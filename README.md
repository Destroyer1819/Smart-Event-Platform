# Smart Event Management & Ticketing Platform

> WPR381 Group Project — Belgium Campus ITVersity

A full-stack web application for managing events, ticket bookings, and customer enquiries. Built for Advanced Events (Pty) Ltd to replace manual spreadsheets with a secure, scalable digital platform.

---

## Technologies Used

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js, Express.js                 |
| Frontend   | EJS, HTML5, CSS3, Bootstrap 5       |
| Database   | MongoDB Atlas, Mongoose ODM         |
| Security   | bcrypt, express-session             |
| Dev Tools  | nodemon, dotenv, method-override    |
| Version Control | Git & GitHub                  |

---

## Team Members & Roles

| Member | Name | Role |
|--------|------|------|
| 1 | Xander | Team Lead / Project Coordinator |
| 2 | Masilo Pudikabekwa | Backend Developer |
| 3 | Nompilo M | Frontend Developer |
| 4 | Justin | Database Engineer |
| 5 | Darius | Security / DevOps Engineer |

---

## Project Structure

```
smart-event-platform/
├── controllers/         # Request handling logic (MVC Controllers)
│   ├── authController.js
│   ├── eventController.js
│   ├── bookingController.js
│   └── enquiryController.js
├── middleware/          # Auth & role protection middleware
│   └── authMiddleware.js
├── models/              # Mongoose schemas (MVC Models)
│   ├── User.js
│   ├── Event.js
│   ├── Booking.js
│   └── Enquiry.js
├── public/              # Static assets
│   ├── css/style.css
│   └── js/
├── routes/              # Express route definitions
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   └── enquiryRoutes.js
├── views/               # EJS templates (MVC Views)
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── auth.ejs
│   ├── events.ejs
│   ├── dashboard.ejs
│   └── contact.ejs
├── app.js               # Entry point
├── seed.js              # Database seeding script
├── .env.example         # Environment variable template
├── .gitignore
└── package.json
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Destroyer1819/Smart-Event-Platform.git
cd Smart-Event-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart-event-platform
SESSION_SECRET=your_secret_here
```

### 4. Seed the database (optional)

```bash
node seed.js
```

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Portal Pages

| Page | URL | Access |
|------|-----|--------|
| Home / Event Listing | `/events` | Public |
| Register / Login | `/register`, `/login` | Public |
| Event Management | `/events/manage` | Admin only |
| Booking & Dashboard | `/bookings/dashboard` | Logged in users |
| Contact / Enquiry | `/enquiries/contact` | Public |
| Admin Enquiries | `/admin/enquiries` | Admin only |

---

## Default Credentials (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@events.co.za | admin123 |
| User | user@events.co.za | user123 |

---

## GitHub Repository

[https://github.com/<Destroyer1819>/smart-event-platform](https://github.com/Destroyer1819/Smart-Event-Platform/tree/main)
