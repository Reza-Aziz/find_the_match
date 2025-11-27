const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }

    // Attach user from DB (to get current role)
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};
