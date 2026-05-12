const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// ─── Database Connection ───────────────────────────────────────────────────────
require('dotenv').config();
const connectDB = require('./config/db.js');

connectDB();

// const Event = require('./models/Event');
// const User = require('./models/User');
// const Booking = require('./models/Booking');
// const Enquiry = require('./models/Enquiry');


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅  MongoDB connected'))
//   .catch((err) => console.error('❌  MongoDB connection error:', err));

// ─── View Engine ──────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname)); //Added Code for error fix---------------------


app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(flash());

// ─── Global Template Variables ─────────────────────────────────────────────────
app.use((req, res, next) => {

  res.locals.user = req.session.user || null; //Added Code for error fix---------------------

  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
const authRoutes     = require('./routes/authRoutes');
const eventRoutes    = require('./routes/eventRoutes');
const bookingRoutes  = require('./routes/bookingRoutes');
const enquiryRoutes  = require('./routes/enquiryRoutes');

app.use('/', authRoutes);
app.use('/auth', authRoutes); // ADDED THIS LINE
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/', enquiryRoutes); // ADDED THIS LINE
app.use('/enquiries', enquiryRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    statusCode: 404
  });});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render('error', {
    title: 'Server Error',
    message: err.message,
    statusCode: 500
  });});

// ─── Server ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});

// // This is for the auth page
// // New combined route, the auth page has everything combined
// app.get('/auth', (req, res) => {
//     res.render('auth', { 
//         title: 'Authentication', 
//         activePage: 'login',
//         user: req.user || null,
//         error: null,
//         success: null
//     });
// });

// // POST routes for form submissions
// app.post('/auth/login', ...);
// app.post('/auth/register', ...);
// app.post('/auth/forgot-password', ...);
// app.get('/auth/logout', ...);
