const mongoose = require("mongoose");

const alertHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goldType: {
      type: String,
      enum: ["24K", "22K", "18K"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["above", "below", "equals"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    triggeredPrice: {
      type: Number,
      required: true,
    },
    triggeredAt: {
      type: Date,
      default: Date.now,
    },
    channel: {
  type: String,
  enum: ["Email", "In-App", "Email, In-App"],
  default: "In-App",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("AlertHistory", alertHistorySchema);
