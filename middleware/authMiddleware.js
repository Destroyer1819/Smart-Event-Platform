// ============================================================
// AUTH & ROLE MIDDLEWARE — Member 5 (Security/DevOps)
// ============================================================

// Blocks unauthenticated users from accessing protected routes
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  req.flash('error', 'You must be logged in to access that page.');
  res.redirect('/auth/login');
};
 
// Restricts access to admin-only routes
exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error', 'Access denied. Admin privileges are required.');
  res.redirect('/events');
};