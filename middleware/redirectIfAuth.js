const jwt = require('jsonwebtoken');

// Middleware to redirect authenticated users away from auth pages (e.g., login/signup)
module.exports = (req, res, next) => {
  const token = req.cookies.token;

  // If there's no token, user is not logged in — proceed to requested route
  if (!token) return next();

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);

    // Token is valid — redirect to dashboard
    return res.redirect('/dashboard');
  } catch (err) {
    // Token is invalid or expired — treat as unauthenticated
    return next();
  }
};
