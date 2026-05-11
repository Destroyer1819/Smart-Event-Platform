// ============================================================
// EVENT MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // TODO: Define fields: title, description, date, category, location,
  // totalCapacity, availableCapacity, price, imageUrl
  // Add validation rules
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
