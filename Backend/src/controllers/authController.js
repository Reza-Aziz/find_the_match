const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username) return res.status(400).json({ success: false, message: "Username is required" });
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    if (!password || password.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const normalizedEmail = email.toLowerCase();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    // Determine role: use provided role (frontend mengirim admin/player) atau default ke player
    const userRole = role && (role === "admin" || role === "player") ? role : "player";

    const user = await User.create({ username, email: normalizedEmail, passwordHash, role: userRole });

    const token = generateToken(user);

    const userSafe = { id: user._id, username: user.username, email: user.email, role: user.role };

    return res.json({ success: true, data: { token, user: userSafe } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user);
    const userSafe = { id: user._id, username: user.username, email: user.email, role: user.role };

    return res.json({ success: true, data: { token, user: userSafe } });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Not authenticated" });
    return res.json({ success: true, data: req.user });
  } catch (err) {
    next(err);
  }
};
