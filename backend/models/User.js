// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
   phone: { type: String, default: "" },

    preferredCurrency: {
    type: String,
    enum: ["USD", "INR", "EUR", "GBP", "JPY"],
    default: "USD",
  },
});


module.exports = mongoose.model("User", userSchema);
