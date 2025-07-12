const jwt = require('jsonwebtoken');

// Middleware to ensure the user is authenticated
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // No token found, redirect to login
    return res.redirect('/login');
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request object for access in routes
    req.user = decoded;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    // Invalid or expired token — log and redirect to login
    console.error('JWT verification failed:', err.message);
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

// Middleware to ensure the user has a 'Manager' role
exports.isManager = (req, res, next) => {
  if (req.user.role !== 'Manager') {
    // Unauthorized access — redirect with error message
    return res.redirect('/dashboard?error=Access denied: Managers only');
  }

  // User is a manager — proceed
  next();
};
