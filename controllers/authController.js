const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.homeRedirect = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.redirect('/dashboard');
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};


exports.getSignup = (req, res) => {
  res.render('signup', { error: null });
};

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postSignup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).render('signup', {
        error: 'Email already exists. Try logging in.',
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role });

    res.status(200).render('login', {error:"Registration Complete"});
  } catch (err) {
    console.error(err);
    return res.status(500).render('signup', {
      error: 'Something went wrong. Please try again.',
    });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).render('login', {
      error: 'User not found',
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render('login', {
      error: 'Incorrect password',
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.redirect('/dashboard');
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
