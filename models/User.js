// ============================================================
// USER MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // TODO: Define fields: name, email, password (hashed), role ('admin'|'user')
  // Add validation rules (required, unique, minlength etc.)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
