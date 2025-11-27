require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (err) {
    logger.error("Server failed to start", err);
    process.exit(1);
  }
})();
