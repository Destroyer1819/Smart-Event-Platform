// ============================================================
// SEED FILE — Member 4 (Database Engineer)
// Run with: node seed.js
// ============================================================
require('dotenv').config();
const mongoose = require('mongoose');

// TODO: Import models once schemas are defined
// const Event = require('./models/Event');
// const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected for seeding...');

    // TODO: Clear existing data
    // await Event.deleteMany();
    // await User.deleteMany();

    // TODO: Insert seed users (1 admin, 2 standard users)
    // TODO: Insert seed events (5-6 realistic events)

    console.log('✅ Seeding complete');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
