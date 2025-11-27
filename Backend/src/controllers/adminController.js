const Question = require("../models/Question");

exports.getAll = async (req, res, next) => {
  try {
    // Admin dapat melihat semua questions (termasuk archived)
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ success: false, message: "Question and answer are required" });
    const q = await Question.create({ question, answer });
    return res.json({ success: true, data: q });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Admin bisa delete permanen soal
    const q = await Question.findByIdAndDelete(id);
    if (!q) return res.status(404).json({ success: false, message: "Question not found" });
    return res.json({ success: true, data: { id } });
  } catch (err) {
    next(err);
  }
};

// Admin-only: reset database (DELETE users and questions)
exports.resetDatabase = async (req, res, next) => {
  try {
    const User = require("../models/User");
    await Question.deleteMany({});
    await User.deleteMany({});
    return res.json({ success: true, data: { message: "Database reset: users and questions removed" } });
  } catch (err) {
    next(err);
  }
};
