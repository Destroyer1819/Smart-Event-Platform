// ============================================================
// ENQUIRY CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Enquiry = require('../models/Enquiry');

exports.getContactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us' });
};

exports.submitEnquiry = async (req, res) => {
  // TODO: Save enquiry from req.body to database, flash success
};

exports.getAllEnquiries = async (req, res) => {
  // TODO: Fetch all enquiries for admin view
};
