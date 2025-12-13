const express = require("express");
const { getLiveGoldPrice ,getGoldHistory } = require("../controllers/goldController.js");

const router = express.Router();

router.get("/live", getLiveGoldPrice);
// ✅ History for charts
router.get("/history", getGoldHistory);

module.exports = router;
