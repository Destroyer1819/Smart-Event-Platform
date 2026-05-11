// ============================================================
// SEED FILE — Member 4 (Database Engineer)
// Run with: node seed.js
// ============================================================
require('dotenv').config();
const mongoose = require('mongoose');
console.log("Your URI is:", process.env.MONGO_URI)

// TODO: Import models once schemas are defined
const Event = require('./models/Event');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Enquiry = require('./models/Enquiry');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected for seeding...');

    await Event.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Enquiry.deleteMany();

    const admin1 = await User.create({
      name: "Justin Shaw",
      email: "admin@clinic1.com",
      password: "securepassword123",
      role: "admin"
    });

    const user1 = await User.create({
      name: "John Doe",
      email: "john@gmail.com",
      password: "password123",
      role: "user"
    });

    const event1 = await Event.create({
      title: "Health & Wellness Workshop",
      description: "A deep dive into community mental health and nutrition.",
      date: new Date('2026-08-10'),
      category: "Workshop",
      location: "Room 101, West Wing",
      totalCapacity: 30,
      availableCapacity: 28,
      price: 50,
      imageUrl: "#1a1a1a"
    });

    await Event.create({
      title: "First Aid Training",
      description: "Basic life support certification course.",
      date: new Date('2026-09-05'),
      category: "Other",
      location: "Main Clinic Hall",
      totalCapacity: 20,
      availableCapacity: 20,
      price: 150,
      imageUrl: "#333333"
    });

    await Booking.create({
      user: user1._id,
      event: event1._id,
      ticketsBooked: 2,
      totalPrice: 100, // (price of 50 x 2 tickets)
      status: "Confirmed"
    });

    await Enquiry.create({
      name: "Sarah Jenkins",
      email: "sarahj@example.com",
      subject: "Vaccine Availability",
      message: "Do you have any flu shots available for walk-ins tomorrow?",
      status: "pending"
    });



    console.log('✅ DATABASE FULLY SEEDED: Users, Events, Bookings, and Enquiries added.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
