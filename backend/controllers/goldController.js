// const axios = require("axios");

// const getLiveGoldPrice = async (req, res) => {
//   try {
//     const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
//       headers: {
//         "x-access-token": process.env.GOLD_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });
//     res.json(response.data);
//   } catch (error)

//   {
//     res.status(500).json({ message: "Error fetching gold price", error: error.message });
//   }
// };

// module.exports = { getLiveGoldPrice };

// const axios = require("axios");

// const getLiveGoldPrice = async (req, res) => {
//   try {
//     const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
//       headers: {
//         "x-access-token": process.env.GOLD_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("GoldAPI error:", error.response?.status, error.message);

//     if (error.response?.status === 403) {
//       // Fallback mock data when quota is exceeded
//       console.warn("GoldAPI quota exceeded — using mock data.");

//       res.json({
//         price: 1950.50,
//         ch: 5.20,
//         chp: 0.27,
//         high_price: 1955.00,
//         low_price: 1948.00,
//         open_price:1945.30,
//         timestamp: Date.now() / 1000,
//       });
//     } else {
//       res.status(500).json({
//         message: "Error fetching gold price",
//         error: error.message,
//       });
//     }
//   }
// };

// module.exports = { getLiveGoldPrice };
// const axios = require("axios");
// const { convertCurrency } = require("../utils/currencyConverter");

// // simple mock data in USD (per ounce) for fallback
// const mockGoldDataUSD = {
//   timestamp: Math.floor(Date.now() / 1000),
//   price: 2400, // current price
//   open_price: 2385, // today's open
//   high_price: 2420,
//   low_price: 2370,
//   ch: 15, // price change
//   chp: 0.63, // % change
// };

// /**
//  * GET /api/gold/live?currency=INR
//  * Returns live (or mock) gold price, converted to requested currency.
//  */
// const getLiveGoldPrice = async (req, res) => {
//   const targetCurrency = (req.query.currency || "USD").toUpperCase();

//   try {
//     let apiData = null;

//     // 1️⃣ Try calling real GoldAPI (if your key is active)
//     try {
//       const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
//         headers: {
//           "x-access-token": process.env.GOLD_API_KEY,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data && !response.data.error) {
//         apiData = response.data; // GoldAPI shape
//       } else {
//         console.warn("⚠️ GoldAPI error, using mock:", response.data?.error);
//       }
//     } catch (err) {
//       console.warn("⚠️ GoldAPI request failed, using mock:", err.message);
//     }

//     // 2️⃣ If API fails or quota exceeded, fall back to mock
//     const base = apiData || mockGoldDataUSD;

//     // GoldAPI fields we care about:
//     // price, open_price, high_price, low_price, ch, chp, timestamp
//     const priceUSD = base.price;

//     const openUSD = base.open_price;
//     const highUSD = base.high_price;
//     const lowUSD = base.low_price;

//     // 3️⃣ Convert numeric values to target currency using your converter
//     const price = await convertCurrency(priceUSD, targetCurrency);
//     const open_price = await convertCurrency(openUSD, targetCurrency);
//     const high_price = await convertCurrency(highUSD, targetCurrency);
//     const low_price = await convertCurrency(lowUSD, targetCurrency);

//     // ch (change) is absolute difference → also convert
//     const ch = await convertCurrency(base.ch, targetCurrency);
//     // chp (%) is percentage → keep same
//     const chp = base.chp;

//     // 4️⃣ Respond with a clean object your frontend already expects
//     res.json({
//       timestamp: base.timestamp,
//       price,
//       open_price,
//       high_price,
//       low_price,
//       ch,
//       chp,
//       currency: targetCurrency,
//     });
//   } catch (error) {
//     console.error("Error in getLiveGoldPrice:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching gold price", error: error.message });
//   }
// };

// module.exports = { getLiveGoldPrice };

// backend/controllers/goldController.js
const axios = require("axios");
const GoldPrice= require('../models/GoldPrice')
const { convertCurrency } = require("../utils/currencyConverter");

const OUNCE_TO_GRAM = 31.1035; // 1 troy ounce = 31.1035 grams

// Fallback mock data (USD per ounce)
const mockGoldDataUSD = {
  timestamp: Math.floor(Date.now() / 1000),
  price: 2400,
  open_price: 2385,
  high_price: 2420,
  low_price: 2370,
  ch: 15,
  chp: 0.63,
};

/**
 * GET /api/gold/live?currency=INR
 * Returns live gold price per gram in requested currency.
 */


const getLiveGoldPrice = async (req, res) => {
  const targetCurrency = (req.query.currency || "USD").toUpperCase();

  try {
    let apiData = null;

    // 1️⃣ Try calling GoldAPI
    try {
      const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
        headers: {
          "x-access-token": process.env.GOLD_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.data && !response.data.error) {
        apiData = response.data;
      } else {
        console.warn("⚠️ GoldAPI error, using mock:", response.data?.error);
      }
    } catch (err) {
      console.warn("⚠️ GoldAPI request failed, using mock:", err.message);
    }

    // 2️⃣ Use mock if API fails
    const base = apiData || mockGoldDataUSD;

    // 3️⃣ Convert USD → target currency
    let price = await convertCurrency(base.price, targetCurrency);
    let open_price = await convertCurrency(base.open_price, targetCurrency);
    let high_price = await convertCurrency(base.high_price, targetCurrency);
    let low_price = await convertCurrency(base.low_price, targetCurrency);
    let ch = await convertCurrency(base.ch, targetCurrency); // absolute change

    // 4️⃣ Convert per ounce → per gram
    price = price / OUNCE_TO_GRAM;
    open_price = open_price / OUNCE_TO_GRAM;
    high_price = high_price / OUNCE_TO_GRAM;
    low_price = low_price / OUNCE_TO_GRAM;
    ch = ch / OUNCE_TO_GRAM;


      const roundedPrice = parseFloat(price.toFixed(2));

    // ✅ 5️⃣ SAVE to Mongo for history
    try {
      await GoldPrice.create({
        // GoldAPI timestamp is in seconds → convert to ms
        timestamp: new Date(base.timestamp * 1000),
        price: roundedPrice,
        currency: targetCurrency,
        unit: "gram",
      });
      // console.log("Saved gold price to DB");
    } catch (saveErr) {
      console.warn("⚠️ Failed to save gold price to DB:", saveErr.message);
    }

    // 5️⃣ Respond
    res.json({
      timestamp: base.timestamp,
      price: parseFloat(price.toFixed(2)),
      open_price: parseFloat(open_price.toFixed(2)),
      high_price: parseFloat(high_price.toFixed(2)),
      low_price: parseFloat(low_price.toFixed(2)),
      ch: parseFloat(ch.toFixed(2)),
      chp: base.chp,
      currency: targetCurrency,
      unit: "gram",
    });
  } catch (error) {
    console.error("Error in getLiveGoldPrice:", error);
    res
      .status(500)
      .json({ message: "Error fetching gold price", error: error.message });
  }
};

// still in backend/controllers/goldController.js

const getGoldHistory = async (req, res) => {
  try {
    const targetCurrency = (req.query.currency || "").toUpperCase();
    const limit = parseInt(req.query.limit, 10) || 50;

    // Build simple query
    const query = {};
    if (targetCurrency) {
      query.currency = targetCurrency;
    }

    const records = await GoldPrice.find(query)
      .sort({ timestamp: 1 }) // oldest → newest
      .limit(limit)
      .select("timestamp price currency -_id");

    const history = records.map((doc) => ({
      timestamp: doc.timestamp,               // raw date
      date: doc.timestamp.toISOString(),      // optional
      price: doc.price,
      currency: doc.currency,
    }));

    res.json(history);
  } catch (err) {
    console.error("Error in getGoldHistory:", err);
    res.status(500).json({
      message: "Error fetching gold price history",
      error: err.message,
    });
  }
};

// module.exports = { getLiveGoldPrice, getGoldHistory };


module.exports = { getLiveGoldPrice , getGoldHistory };
