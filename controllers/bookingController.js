// ============================================================
// BOOKING CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.getDashboard = async (req, res, next) => {
  // TODO: Fetch bookings for current user (or all bookings + analytics for admin)
  try {
    let bookings = [];
    let events = [];

    if (req.session.user && req.session.user.role === 'admin'){
      bookings = await Booking.find()
        .populate('user')
        .populate('event')
        .sort({ createdAt: -1 });

      events = await Event.find().sort({ date: 1 });
    } else {
      bookings = await Booking.find({user: req.session.user.id})
        .populate('event')
        .sort({ createdAt: -1 });

      events = await Event.find().sort({ date: 1 });
    }

    res.render('dashboard', {
      title: 'Dashboard',
      bookings, 
      events
    });

  } catch (error) {
    next(error);
  }
};

exports.bookTicket = async (req, res, next) => {
  // TODO: Check event capacity, create booking, decrement event capacity
  try {
    const eventId = req.params.id || req.body.eventId;
    const userId = req.session.user.id; 

    const event = await Event.findById(eventId);

    if (!event) {
      req.flash('error', 'Event not found.');
      return res.redirect('/dashboard');
    }

    if (event.capacity <= 0) {
      req.flash('error', 'This event is fully booked.');
      return res.redirect('/dashboard');
    }
 
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId
    });

    if (existingBooking) {
      req.flash('error', 'You already booked this event.');
      return res.redirect('/dashboard');
    }

    await Booking.create({
      user: userId,
      event: eventId,
      bookingDate: new Date()
    });

    event.capacity -= 1;
    await event.save();

    req.flash('success', 'Ticket booked successfully.');
      return res.redirect('/dashboard');

  } catch (error) {
    next(error); 
  }
};

exports.cancelBooking = async (req, res, next) => {
  // TODO: Delete booking, restore event capacity
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      req.flash('error', 'Booking not found.');
      return res.redirect('/dashboard');
    }

    if (req.session.user.role !== 'admin' && booking.user.toString() !== req.session.user.id) {
      req.flash('error', 'You are not allowed to cancel this booking.');
      return res.redirect('/dashboard');
    }

    await Event.findByIdAndUpdate(booking.event, {
      $inc: { capacity: 1 }
    });

    await Booking.findByIdAndDelete(bookingId);

    req.flash('success', 'Booking cancelled successfully.');
      return res.redirect('/dashboard');

  } catch (error) {
    next(error);
  }
};
