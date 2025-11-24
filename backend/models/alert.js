const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link each alert to a user
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
    channel: {
      type: String,
      enum: ["Email", "In-App", "Email, In-App"],
      default: "In-App",
    },
    isActive: {
      type: Boolean,
      default: true, // active alert by default
    },
    triggeredAt: {
      type: Date, // store when the alert was triggered
      default: null,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Alert", alertSchema);
