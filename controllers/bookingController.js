// ============================================================
// BOOKING CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.getDashboard = async (req, res) => {
  // TODO: Fetch bookings for current user (or all bookings + analytics for admin)
  res.render('dashboard', { title: 'Dashboard', bookings: [], events: [] });
};

exports.bookTicket = async (req, res) => {
  // TODO: Check event capacity, create booking, decrement event capacity
};

exports.cancelBooking = async (req, res) => {
  // TODO: Delete booking, restore event capacity
};
