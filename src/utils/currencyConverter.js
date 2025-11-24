
import axios from "axios";

let cachedRates = null;
let lastFetched = null;

export const convertToUSD = async (amount, fromCurrency) => {
  try {
    if (fromCurrency === "USD") return amount;

    const now = Date.now();

    // Refresh every 30 minutes
    if (!cachedRates || now - lastFetched > 30 * 60 * 1000) {
      const res = await axios.get("https://open.er-api.com/v6/latest/USD");
      cachedRates = res.data.rates;
      lastFetched = now;
      console.log("✅ Rates updated (frontend)");
    }

    const rate = cachedRates[fromCurrency];
    if (!rate) throw new Error("No rate found for " + fromCurrency);

    // Convert FROM user's currency → USD
    const usdValue = amount / rate;
    return usdValue;
  } catch (err) {
    console.error("⚠️ Conversion failed:", err.message);
    return amount; // fallback: no conversion
  }
};
