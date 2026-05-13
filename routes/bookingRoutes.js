const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/dashboard', isAuthenticated, bookingController.getDashboard);
router.post('/book/:eventId', isAuthenticated, bookingController.bookTicket);

//ADDED this line WHY: some buttons/links may open /book/:eventId using GET, not POST.

router.delete('/cancel/:bookingId', isAuthenticated, bookingController.cancelBooking);

module.exports = router;
