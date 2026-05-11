// ============================================================
// AUTH CONTROLLER — Member 2 (Backend Developer)
// ============================================================
// TODO: Implement the following functions using bcrypt for
// password hashing and express-session for session management.

//const { name } = require('ejs');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
  res.render('auth', { title: 'Register', mode: 'register' });
};

exports.postRegister = async (req, res, next) => {
  // TODO: Hash password with bcrypt, save user, redirect to login
  try{
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password) {
      req.flash('error', 'Please complete all required fields.');
      return res.redirect('/register');
    }

    if (confirmPassword && password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/register');
    }

    const existingUser = await User.findOne({email: email.toLowerCase().trim() });
    if (existingUser) {
      req.flash('error', 'An account with this email already exists.');
      return res.redirect('/register');
    }

    const hashedpassword = await bcrypt.hash(password, 12);

    const safeRole = 
    req.session.user?.role === 'admin' && 
    ['user', 'organizer', 'admin'].includes(role)
    ? role
    : 'user';

    await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedpassword,
      role: safeRole
    })

    req.flash('success', 'Registration successful. Please log in');
    res.redirect('/login');

  }catch(error){
    if (error.code === 11000) {
      req.flash('error', 'An account with this email already exists.');
      return res.redirect('/register');
    } 

    next(error);
  }

};

exports.getLogin = (req, res) => {
  res.render('auth', { title: 'Login', mode: 'login' });
};

exports.postLogin = async (req, res, next) => {
  // TODO: Find user by email, compare bcrypt hash, set session
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      req.flash('error', 'Please enter your Email or Password.');
      return res.redirect('/login');
    }

    const user = await User.findOne({email: email.toLowerCase().trim() });
    if (!user) {
      req.flash('error', 'Invalid Email or Password.');
      return res.redirect('/login');
    }

    const passwordMastches = await bcrypt.compare(password, user.password);
    if (!passwordMastches) {
      req.flash('error', 'Invalid Email or Password.');
      return res.redirect('/login');
    }

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/bookings/dashboard');

  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  // TODO: Destroy session and redirect to login
  req.session.destroy((error) => {
    if (error) return next(error);

    res.clearCookie('connect.sid')
    res.redirect('/login')
  })
};
