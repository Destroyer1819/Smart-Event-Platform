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

    bookings = bookings.filter(booking => booking.event);

    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(booking =>
      booking.event &&
      new Date(booking.event.date) > new Date()
    ).length;

    const totalSpent = bookings.reduce((sum, booking) => {
      if (booking.event && booking.event.price) {
        return sum + booking.event.price;
      }
      return sum;
    }, 0);

    const favoriteEvents = bookings.length;

    const upcomingEvents = events.filter(event =>
      new Date(event.date) > new Date()
    );


    res.render('dashboard', {
      title: 'Dashboard',
      bookings,
      events,
      totalBookings,
      upcomingBookings,
      totalSpent,
      favoriteEvents,
      upcomingEvents
    });

  } catch (error) {
    next(error);
  }
};

exports.bookTicket = async (req, res, next) => {
  // TODO: Check event capacity, create booking, decrement event capacity
  try {
    const eventId = req.params.eventId || req.params.id || req.body.eventId;
    const userId = req.session.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      req.flash('error', 'Event not found.');
      return res.redirect('/bookings/dashboard');
    }

    if (event.availableCapacity <= 0) {
      req.flash('error', 'This event is fully booked.');
      return res.redirect('/bookings/dashboard');
    }
 
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId
    });

    if (existingBooking) {
      req.flash('error', 'You already booked this event.');
      return res.redirect('/bookings/dashboard');
    }

    await Booking.create({
      user: userId,
      event: eventId,
      ticketsBooked: 1,
      totalPrice: event.price,
      status: 'Confirmed',
      bookingDate: new Date()
    });

    event.availableCapacity -= 1;
    await event.save();

    req.flash('success', 'Ticket booked successfully.');
      return res.redirect('/bookings/dashboard');

  } catch (error) {
    next(error); 
  }
};

exports.cancelBooking = async (req, res, next) => {
  // TODO: Delete booking, restore event capacity
  try {
    const bookingId = req.params.bookingId || req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      req.flash('error', 'Booking not found.');
      return res.redirect('/bookings/dashboard');
    }

    if (req.session.user.role !== 'admin' && booking.user.toString() !== req.session.user.id) {
      req.flash('error', 'You are not allowed to cancel this booking.');
      return res.redirect('/bookings/dashboard');
    }

    await Event.findByIdAndUpdate(booking.event, {
      $inc: { availableCapacity: 1 }
    });

    await Booking.findByIdAndDelete(bookingId);

    req.flash('success', 'Booking cancelled successfully.');
      return res.redirect('/bookings/dashboard');

  } catch (error) {
    next(error);
  }
};
