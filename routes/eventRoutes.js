const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', eventController.getAllEvents);
router.get('/manage', isAuthenticated, isAdmin, eventController.getManagePage);

router.get('/create', isAuthenticated, isAdmin, (req, res) => {
    res.render('create-event', {
      title: 'Create Event'
    });
});

router.post('/create', isAuthenticated, isAdmin, eventController.createEvent);
router.get('/edit/:id', isAuthenticated, isAdmin, eventController.getEditEvent);
router.put('/edit/:id', isAuthenticated, isAdmin, eventController.updateEvent);
router.delete('/delete/:id', isAuthenticated, isAdmin, eventController.deleteEvent);

module.exports = router;
