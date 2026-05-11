const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/contact', enquiryController.getContactPage);
router.post('/contact', enquiryController.submitEnquiry);
router.get('/admin/enquiries', isAuthenticated, isAdmin, enquiryController.getAllEnquiries);

module.exports = router;
