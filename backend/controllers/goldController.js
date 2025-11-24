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

const axios = require("axios");

const getLiveGoldPrice = async (req, res) => {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": process.env.GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("GoldAPI error:", error.response?.status, error.message);

    if (error.response?.status === 403) {
      // Fallback mock data when quota is exceeded
      console.warn("GoldAPI quota exceeded — using mock data.");

      res.json({
        price: 1950.50,
        ch: 5.20,
        chp: 0.27,
        high_price: 1955.00,
        low_price: 1948.00,
        open_price:1945.30,
        timestamp: Date.now() / 1000,
      });
    } else {
      res.status(500).json({
        message: "Error fetching gold price",
        error: error.message,
      });
    }
  }
};

module.exports = { getLiveGoldPrice };