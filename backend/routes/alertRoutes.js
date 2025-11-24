const express = require("express");
const router = express.Router();
const {
  createAlert,
  getUserAlerts,
  updateAlert,
  deleteAlert,
  getAlertHistory
} = require("../controllers/alertController");
const authMiddleware = require("../middleware/auth");

// Routes (protected)
router.post("/", authMiddleware, createAlert);
router.get("/history", authMiddleware, getAlertHistory);
router.get("/", authMiddleware, getUserAlerts);
router.put("/:id", authMiddleware, updateAlert);
router.delete("/:id", authMiddleware, deleteAlert);



module.exports = router;
