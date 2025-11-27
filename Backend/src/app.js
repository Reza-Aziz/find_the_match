const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ success: true, data: "Find The Match API" }));

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;
