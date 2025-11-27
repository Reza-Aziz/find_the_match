module.exports = function adminMiddleware(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Not authenticated" });
    if (req.user.role !== "admin") return res.status(403).json({ success: false, message: "Forbidden: admin only" });
    next();
  } catch (err) {
    next(err);
  }
};
