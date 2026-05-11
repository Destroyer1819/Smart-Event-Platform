// ============================================================
// BOOKING MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  event:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },

  ticketsBooked:{
    type: Number,
    required: true,
     min : [1, 'Must book at least 1 ticket']
  },

  totalPrice:{
    type: Number,
    required: true,
  },

  status:{
    type: String,
    enum: ['Pending','Confirmed', 'Cancelled'],
    default: 'Confirmed'
  },
  
  bookingDate:{
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
