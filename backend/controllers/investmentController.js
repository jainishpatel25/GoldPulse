// const Investment = require('../models/Investment');
// const formatPerformanceData = require("../utils/formatPerformanceData");

// // Add a new investment
// const addInvestment = async (req, res) => {
//   try {
//     const { type, quantity, pricePerGram, date } = req.body;
//     const totalValue = quantity * pricePerGram;

//     const investment = new Investment({
//       type,
//       quantity,
//       pricePerGram,
//       totalValue,
//       date,
//       user: req.userId,
//     });
//     console.log("User ID from token:", req.userId);
//     const saved = await investment.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.error("Error adding investment:", error);
//     res.status(500).json({ message: 'Error adding investment', error: error.message });
//   }
// };

// // Get all investments
// const getInvestments = async (req, res) => {
//   try {
//     const investments = await Investment.find().sort({ createdAt: -1 });
//     res.json(investments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching investments', error });
//   }
// };

// // Delete investment
// const deleteInvestment = async (req, res) => {
//   try {
//     await Investment.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Investment deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting investment', error });
//   }
// };

// const performanceInvesment= async (req, res) => {
//   const range = req.query.range || "1M";

//   try {
//     const investments = await Investment.find().sort({ date: 1 });

//     // Group and format based on range
//     const data = formatPerformanceData(investments, range);

//     const totalValue = data.length ? data[data.length - 1].value : 0;
//     const initialValue = data.length ? data[0].value : 0;
//     const change = initialValue ? ((totalValue - initialValue) / initialValue) * 100 : 0;

//     res.json({ data, value: totalValue, change });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch performance data" });
//   }
// }


// module.exports = {
//   addInvestment,
//   getInvestments,
//   deleteInvestment,
//   performanceInvesment,
// };
const Investment = require("../models/Investment");
const formatPerformanceData = require("../utils/formatPerformanceData");
const { convertCurrency } = require("../utils/currencyConverter");
const User = require("../models/User");

const addInvestment = async (req, res) => {
  try {
    const { type, quantity, pricePerGram, date } = req.body;
    const totalValue = quantity * pricePerGram;


    const investment = new Investment({
      type,
      quantity,
      pricePerGram,
      totalValue,
      date,
      user: req.userId, // ✅ required for ownership
    });

    console.log("User ID from token:", req.userId); // ✅ confirms middleware worked


    const saved = await investment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding investment:", error);
    res.status(500).json({ message: "Error adding investment", error: error.message });
  }
};

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.userId }).sort({ createdAt: -1 });
     // 2️⃣ Find the user's preferred currency
    const user = await User.findById(req.userId);
    const preferredCurrency = user?.preferredCurrency || "USD";

      // 3️⃣ Convert totalValue + pricePerGram for each investment
    const convertedInvestments = await Promise.all(
      investments.map(async (inv) => {
        const convertedTotal = await convertCurrency(inv.totalValue, preferredCurrency);
        const convertedPrice = await convertCurrency(inv.pricePerGram, preferredCurrency);

        return {
          ...inv.toObject(),
          convertedTotalValue: convertedTotal.toFixed(2),
          convertedPricePerGram: convertedPrice.toFixed(2),
          preferredCurrency,
        };
      })
    );

    res.json({ preferredCurrency, investments: convertedInvestments });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ message: "Error fetching investments", error: error.message });
  }
};

const deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findOneAndDelete({
      _id: req.params.id,
      user: req.userId, // ✅ ensures user owns the investment
    });

    if (!investment) {
      return res.status(404).json({ message: "Investment not found or unauthorized" });
    }

    res.json({ message: "Investment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting investment", error: error.message });
  }
};

const performanceInvesment = async (req, res) => {
  const range = req.query.range || "1M";

  try {
    const investments = await Investment.find({ user: req.userId }).sort({ date: 1 });

    const data = formatPerformanceData(investments, range);
    const totalValue = data.length ? data[data.length - 1].value : 0;
    const initialValue = data.length ? data[0].value : 0;
    const change = initialValue ? ((totalValue - initialValue) / initialValue) * 100 : 0;

    res.json({ data, value: totalValue, change });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch performance data", details: error.message });
  }
};

module.exports = {
  addInvestment,
  getInvestments,
  deleteInvestment,
  performanceInvesment,
};