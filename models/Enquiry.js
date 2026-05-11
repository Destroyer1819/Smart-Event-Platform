// ============================================================
// ENQUIRY MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  // TODO: Define fields: name, email, subject, message, status ('pending'|'resolved')
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
