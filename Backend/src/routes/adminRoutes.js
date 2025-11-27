const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(authMiddleware, adminMiddleware);

router.get("/questions", adminController.getAll);
router.post("/questions", adminController.create);
router.delete("/questions/:id", adminController.remove);

module.exports = router;
