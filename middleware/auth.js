const jwt = require('jsonwebtoken');

// 🔒 Middleware to check if user is authenticated
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login'); // or res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.redirect('/login');
  }
};

// 🔐 Middleware to check if user is a Manager
exports.isManager = (req, res, next) => {
  if (req.user.role !== 'Manager') {
return res.redirect('/dashboard?error=Access denied: Managers only');
  }
  next();
};
