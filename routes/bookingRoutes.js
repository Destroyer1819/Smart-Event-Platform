const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/dashboard', isAuthenticated, bookingController.getDashboard);
router.post('/book/:eventId', isAuthenticated, bookingController.bookTicket);
router.delete('/cancel/:bookingId', isAuthenticated, bookingController.cancelBooking);

module.exports = router;
