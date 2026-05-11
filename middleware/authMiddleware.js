// ============================================================
// AUTH & ROLE MIDDLEWARE — Member 5 (Security/DevOps)
// ============================================================

// Protect routes that require login
exports.isAuthenticated = (req, res, next) => {
  // TODO: Check req.session.user exists, else redirect to /login with flash error
  next();
};

// Protect routes that require admin role
exports.isAdmin = (req, res, next) => {
  // TODO: Check req.session.user.role === 'admin', else redirect with 403 flash
  next();
};
