// ============================================================
// EVENT CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Event = require('../models/Event');

function getEventStats(events) {
  return {
    totalEvents: events.length,
    availableEvents: events.filter(event => event.availableCapacity > 0).length,
    limitedEvents: events.filter(event => event.availableCapacity > 0 && event.availableCapacity <= 5).length,
    soldOutEvents: events.filter(event => event.availableCapacity <= 0).length
  };
}

exports.getAllEvents = async (req, res, next) => {
  try {
    const { search, category, dateFrom, dateTo, sortBy } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (dateFrom || dateTo) {
      filter.date = {};

      if (dateFrom) {
        filter.date.$gte = new Date(dateFrom);
      }

      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    let sortOption = { date: 1 };

    if (sortBy === 'date_desc') sortOption = { date: -1 };
    if (sortBy === 'price_asc') sortOption = { price: 1 };
    if (sortBy === 'price_desc') sortOption = { price: -1 };

    const events = await Event.find(filter).sort(sortOption);
    const stats = getEventStats(events);

    res.render('events', {
      title: 'All Events',
      events,
      ...stats,
      searchQuery: search || '',
      category: category || '',
      dateFrom: dateFrom || '',
      dateTo: dateTo || '',
      sortBy: sortBy || 'date_asc',
      currentPage: 1,
      totalPages: 1
    });

  } catch (error) {
    next(error);
  }
};

exports.getManagePage = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    const stats = getEventStats(events);

    res.render('events', {
      title: 'Manage Events',
      events,
      ...stats,
      searchQuery: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date_asc',
      currentPage: 1,
      totalPages: 1
    });

  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      venue,
      date,
      price,
      totalCapacity,
      capacity,
      imageUrl,
      image
    } = req.body;

    const finalCapacity = Number(totalCapacity || capacity);

    await Event.create({
      title,
      description,
      category,
      location: location || venue,
      date,
      price: Number(price),
      totalCapacity: finalCapacity,
      availableCapacity: finalCapacity,
      imageUrl: imageUrl || image || '#cccccc'
    });

    req.flash('success', 'Event created successfully.');
    res.redirect('/events/manage');

  } catch (error) {
    next(error);
  }
};

exports.getEditEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
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
  try {
    const {
      title,
      description,
      category,
      location,
      venue,
      date,
      price,
      totalCapacity,
      capacity,
      imageUrl,
      image
    } = req.body;

    const finalCapacity = Number(totalCapacity || capacity);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        location: location || venue,
        date,
        price: Number(price),
        totalCapacity: finalCapacity,
        imageUrl: imageUrl || image || '#cccccc'
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      req.flash('error', 'Event not found.');
      return res.redirect('/events/manage');
    }

    req.flash('success', 'Event updated successfully.');
    res.redirect('/events/manage');

  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    req.flash('success', 'Event deleted successfully.');
    res.redirect('/events/manage');

  } catch (error) {
    next(error);
  }
};