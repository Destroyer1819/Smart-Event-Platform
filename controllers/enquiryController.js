// ============================================================
// ENQUIRY CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Enquiry = require('../models/Enquiry');

exports.getContactPage = (req, res) => {
  res.render('contact', { title: 'Contact Us' });
};

exports.submitEnquiry = async (req, res, next) => {
  // TODO: Save enquiry from req.body to database, flash success
  try {
    const  {name, email, subject, message} = req.body;

    await Enquiry.create({
      name, 
      email, 
      subject, 
      message  
    })

    req.flash('success', 'Your enquiry has been submitted successfully');
    res.redirect('/contact');

  } catch (error) {
    next(error);
  }
};

exports.getAllEnquiries = async (req, res, next) => {
  // TODO: Fetch all enquiries for admin view
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.render('enquiries', {
      title: 'All Enquiries',
      enquiries
    })
  } catch (error) {
    next(error);
  }
};
