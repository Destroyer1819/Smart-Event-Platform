// ============================================================
// EVENT CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Event = require('../models/Event');

exports.getAllEvents = async (req, res, next) => {
  // TODO: Fetch events, support search/filter query params (date, category, availability)
  try {
    const {search, category, date} = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        {title: {$regex: search, $options: 'i'}}, 
        {description: {$regex: search, $options: 'i'}},
        {venue: {$regex: search, $options: 'i'}}
      ];
    }

    if (category && category !== 'all'){
      filter.category = category;
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      end.setHours(23,59,59,999);

      filter.date = {
        $gte: start,
        $lte: end
      };
    }

    const events = await Event.find(filter).sort({date: 1});
    res.render('events/index', {
      title: 'All Events',
      events, 
      filters: {
        search: search || '',
        category: category || '',
        date: date || ''
      }
    })

  } catch (error) {
    next(error);
  }
};


exports.getManagePage = async (req, res, next) => {
  // TODO: Fetch all events for admin management view
  try {
    const events = await Event.find().sort({createdAt: -1});

    res.render('events/manage', {
      title: 'Manage Events',
      events
    });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  // TODO: Create new event from req.body, redirect to manage page
  try {
    const{
      title,
      description,
      category,
      venue,
      date,
      price,
      capacity,
      image
    } = req.body;

    await Event.create({
      title,
      description,
      category,
      venue,
      date,
      price,
      capacity,
      image
    });

    req.flash('success', 'Event created successfully.');
    res.redirect('/events/manage');
  
  } catch (error) {
    next(error);
  }
};

exports.getEditEvent = async (req, res, next) => {
  // TODO: Find event by id, render edit form
  try {
    const event = await Event.findById(req.params.id);

    if (!event){
      req.flash('error', 'Event not found.');
      return res.redirect('/events/manage');
    }

    res.render('edit-event', {
      title: 'Edit Event',
      event
    });

  } catch (error) {
    next(error);
  }

};

exports.updateEvent = async (req, res, next) => {
  // TODO: Find by id, update fields, redirect
  try {
    const{
      title,
      description,
      category,
      venue,
      date,
      price,
      capacity,
      image
    } = req.body;

    await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      venue,
      date,
      price,
      capacity,
      image
    });

    req.flash('success', 'Event updated successfully.')
    res.redirect('/events/manage')
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  // TODO: Find by id, delete, redirect
  try {
    await Event.findByIdAndDelete(req.params.id);

    req.flash('success', 'Event deleted successfully.');

    res.redirect('/events/manage');
  } catch (error) {
    next(error);
  }
};
