const cron = require("node-cron");
const Alert = require("../models/alert");
const AlertHistory = require("../models/alertHistory");

// Simulated gold price data (since your API is off for now)
let mockGoldPrices = {
  "24K": 6100,
  "22K": 5650,
  "18K": 4800,
};

// Run every 1 minute (for testing, use */10 * * * * * for every 10 seconds)
cron.schedule("*/10 * * * * *", async () => {
  console.log("🔄 Running alert check...");

  try {
    const activeAlerts = await Alert.find({ isActive: true });

    for (const alert of activeAlerts) {
      const currentPrice = mockGoldPrices[alert.goldType];

      let conditionMet = false;
      if (alert.condition === "above" && currentPrice > alert.price) conditionMet = true;
      if (alert.condition === "below" && currentPrice < alert.price) conditionMet = true;
      if (alert.condition === "equals" && currentPrice === alert.price) conditionMet = true;

      if (conditionMet) {
        console.log(`🚨 Alert triggered for ${alert.goldType} at ${currentPrice}`);

        // Add to AlertHistory
        await AlertHistory.create({
          user: alert.user,
          goldType: alert.goldType,
          condition: alert.condition,
          price: alert.price,
          triggeredPrice: currentPrice,
          channel:alert.channel,
        });

        // Mark the original alert as inactive
        alert.isActive = false;
        alert.triggeredAt = new Date();
        await alert.save();
      }
    }
  } catch (err) {
    console.error("❌ Error checking alerts:", err);
  }
});
