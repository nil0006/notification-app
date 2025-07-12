const jwt = require("jsonwebtoken");

// Signs a JWT for the logged-in user and stores it in a secure HTTP-only cookie (2-hour expiry)
exports.createSession = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
