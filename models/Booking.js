// ============================================================
// BOOKING MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // TODO: Define fields: user (ref User), event (ref Event),
  // ticketsBooked, totalPrice, status
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
