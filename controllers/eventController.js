// ============================================================
// EVENT CONTROLLER — Member 2 (Backend Developer)
// ============================================================
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  // TODO: Fetch events, support search/filter query params (date, category, availability)
  res.render('home', { title: 'Events', events: [] });
};

exports.getManagePage = async (req, res) => {
  // TODO: Fetch all events for admin management view
  res.render('events', { title: 'Manage Events', events: [] });
};

exports.createEvent = async (req, res) => {
  // TODO: Create new event from req.body, redirect to manage page
};

exports.getEditEvent = async (req, res) => {
  // TODO: Find event by id, render edit form
};

exports.updateEvent = async (req, res) => {
  // TODO: Find by id, update fields, redirect
};

exports.deleteEvent = async (req, res) => {
  // TODO: Find by id, delete, redirect
};
