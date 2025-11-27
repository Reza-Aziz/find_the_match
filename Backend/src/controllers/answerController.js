const Question = require("../models/Question");
const User = require("../models/User");

exports.submit = async (req, res, next) => {
  try {
    const { questionId, userAnswer } = req.body;
    if (!questionId || typeof userAnswer !== "string") return res.status(400).json({ success: false, message: "questionId and userAnswer are required" });

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ success: false, message: "Question not found" });

    const normalize = (s) => String(s).trim().toLowerCase();
    const correct = normalize(userAnswer) === normalize(question.answer);

    if (correct) {
      // Archive question (soft delete) instead of hard delete
      await Question.findByIdAndUpdate(questionId, { archived: true });

      // Increment user score
      await User.findByIdAndUpdate(req.user.id, { $inc: { score: 1 } });

      return res.json({ success: true, data: { correct: true } });
    }

    return res.json({ success: true, data: { correct: false } });
  } catch (err) {
    next(err);
  }
};
