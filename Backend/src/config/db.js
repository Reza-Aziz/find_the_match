const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    logger.error("MONGODB_URI is not set in environment");
    throw new Error("MONGODB_URI is not set");
  }

  try {
    await mongoose.connect(uri, {
      // mongoose 6+ handles most options automatically
    });
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    throw err;
  }
};

module.exports = connectDB;
