// ============================================================
// AUTH CONTROLLER — Member 2 (Backend Developer)
// ============================================================
// TODO: Implement the following functions using bcrypt for
// password hashing and express-session for session management.

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
  res.render('auth', { title: 'Register', mode: 'register' });
};

exports.postRegister = async (req, res) => {
  // TODO: Hash password with bcrypt, save user, redirect to login
};

exports.getLogin = (req, res) => {
  res.render('auth', { title: 'Login', mode: 'login' });
};

exports.postLogin = async (req, res) => {
  // TODO: Find user by email, compare bcrypt hash, set session
};

exports.logout = (req, res) => {
  // TODO: Destroy session and redirect to login
};
