// backend/utils/currencyConverter.js
const axios = require("axios");

let cachedRates = null;
let lastFetched = null;

exports.convertCurrency = async (priceUSD, targetCurrency = "USD") => {
  try {
    if (targetCurrency === "USD") return priceUSD;

    const now = Date.now();

    // Fetch new rates only if cache expired
    if (!cachedRates || now - lastFetched > 30 * 60 * 1000) {
      console.log("🌍 Fetching latest currency rates...");
    //   const res = await axios.get("https://api.exchangerate.host/latest?base=USD");
const res = await axios.get("https://open.er-api.com/v6/latest/USD");

      if (!res.data || !res.data.rates) {
        throw new Error("Invalid response from ExchangeRate API");
      }

      cachedRates = res.data.rates;
      lastFetched = now;
      console.log("✅ Currency rates updated successfully");
    }

    // Get rate safely
    const rate = cachedRates[targetCurrency];
    if (rate === undefined) {
      console.warn(`⚠️ No conversion rate found for ${targetCurrency}, using USD fallback`);
      return priceUSD;
    }

    const converted = priceUSD * rate;
    return converted;
  } catch (err) {
    console.error("⚠️ Currency conversion failed:", err.message);
    return priceUSD; // fallback to USD if conversion fails
  }
};

// Mock version for offline testing (temporary)
// exports.convertCurrency = async (priceUSD, targetCurrency = "USD") => {
//   const mockRates = {
//     USD: 1,
//     INR: 83,
//     EUR: 0.92,
//     GBP: 0.79,
//     JPY: 151,
//   };
//   const rate = mockRates[targetCurrency] || 1;
//   return priceUSD * rate;
// };
