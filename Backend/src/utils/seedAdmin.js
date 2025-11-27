// seedAdmin is intentionally minimal per spec (no automatic admin seeding required)
// This file exports a helper that can be run manually to create an admin if desired.

const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seedAdmin(username, email, password) {
  const existing = await User.findOne({ email });
  if (existing) return existing;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, passwordHash: hash, role: "admin" });
  return user;
}

module.exports = seedAdmin;
