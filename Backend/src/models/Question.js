const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
