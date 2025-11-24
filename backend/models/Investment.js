const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true }, // Gold Bars, Coins, etc.
    quantity: { type: Number, required: true },
    pricePerGram: { type: Number, required: true },
    totalValue: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", investmentSchema);
