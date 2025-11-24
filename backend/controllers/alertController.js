const Alert = require("../models/alert");

const AlertHistory = require("../models/alertHistory");

// Create a new alert
exports.createAlert = async (req, res) => {
  try {
    const { goldType, condition, price, channel } = req.body;

    if (!goldType || !condition || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const alert = await Alert.create({
      user: req.userId,
      goldType,
      condition,
      price,
      channel,
    });

    res.status(201).json({ message: "Alert created successfully", alert });
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all alerts for the logged-in user
exports.getUserAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing alert
exports.updateAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Alert.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert updated successfully", updated });
  } catch (error) {
    console.error("Error updating alert:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete alert
exports.deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Alert.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    console.error("Error deleting alert:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAlertHistory = async (req, res) => {
  try {
    // 🧩 Your auth sets req.userId directly
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found in token" });
    }

    const histories = await AlertHistory.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(histories);
  } catch (error) {
    console.error("Error fetching alert history:", error);
    res.status(500).json({ message: "Server error fetching alert history" });
  }
};
