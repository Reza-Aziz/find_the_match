const Question = require("../models/Question");

exports.getAll = async (req, res, next) => {
  try {
    // Return all questions (player will filter which ones they haven't answered)
    const questions = await Question.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
};
