// backend/models/GoldPrice.js
const mongoose = require("mongoose");

const goldPriceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  price: { type: Number, required: true }, // per gram
  currency: { type: String, default: "USD" },
  unit: { type: String, default: "gram" },
});

module.exports = mongoose.model("GoldPrice", goldPriceSchema);
