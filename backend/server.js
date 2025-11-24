const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


const goldRoutes=require("./routes/goldRoutes");
const investmentRoutes=require("./routes/investmentRoutes.js");
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");

// require("./utils/cronJobs.js");

const { convertCurrency }=require("./utils/currencyConverter.js");





dotenv.config();
console.log("Loaded GOLD_API_KEY:", process.env.GOLD_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.send("GoldPulse Backend is running successfully 🚀");
});


app.get("/api/test-convert", async (req, res) => {
  const usdPrice = 1;
  const convertedINR = await convertCurrency(usdPrice, "INR");
  const convertedEUR = await convertCurrency(usdPrice, "EUR");
   const convertedJPY = await convertCurrency(usdPrice, "JPY");
    const convertedGBP = await convertCurrency(usdPrice, "GBP");

  res.json({ base: usdPrice, INR: convertedINR, EUR: convertedEUR ,JPY: convertedJPY,GBP: convertedGBP});
});

app.use("/api/gold", goldRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

