const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createSession } = require("../utility/auth");


exports.homeRedirect = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.redirect("/dashboard");
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};


// Render the signup form
exports.getSignup = (req, res) => {
  res.render("signup", { error: null });
};

// Render the login form
exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

// Handle user signup logic
exports.postSignup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).render("signup", {
        error: "Email already exists. Try logging in.",
      });
    }

    // Hash password before storing
    const hashed = await bcrypt.hash(password, 10);

    // Save user to database
    const user = await User.create({ name, email, password: hashed, role });

    // Set JWT cookie for session
    createSession(res, user);

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
};

// Handle user login logic
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).render("login", {
      error: "Email and password are required.",
    });
  }

  try {
    //  Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("login", {
        error: "User not found.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("login", {
        error: "Incorrect password.",
      });
    }

    // Login successful → Set cookie
    createSession(res, user);
    res.redirect("/dashboard");

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).render("login", {
      error: "Server error. Please try again later.",
    });
  }
};

// Clear cookie and logout user
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
