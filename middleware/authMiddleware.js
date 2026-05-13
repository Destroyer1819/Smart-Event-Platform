// ============================================================
// AUTH & ROLE MIDDLEWARE — Member 5 (Security/DevOps)
// ============================================================

// Protect routes that require login
exports.isAuthenticated = (req, res, next) => {
  // TODO: Check req.session.user exists, else redirect to /login with flash error
  if (req.session && req.session.user) {
    return next();
  }

  req.flash('error', 'Please log in to continue.');
  return res.redirect('/auth/login');
};

// Protect routes that require admin role
exports.isAdmin = (req, res, next) => {
  // TODO: Check req.session.user.role === 'admin', else redirect with 403 flash
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }

  req.flash('error', 'Access denied.');
  return res.redirect('/bookings/dashboard');
};
