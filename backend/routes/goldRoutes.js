const express = require("express");
const { getLiveGoldPrice }=require("../controllers/goldController.js");

const router = express.Router();

router.get("/live", getLiveGoldPrice);


module.exports = router;
