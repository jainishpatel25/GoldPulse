import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../../styles/main.css";

// Dummy data for different ranges (can later be replaced with API)
const dummyRangeData = {
  "1D": [
    { time: "9AM", price: 1600 },
    { time: "12PM", price: 1620 },
    { time: "3PM", price: 1610 },
    { time: "6PM", price: 1630 },
  ],
  "1W": [
    { time: "Mon", price: 1500 },
    { time: "Tue", price: 1520 },
    { time: "Wed", price: 1550 },
    { time: "Thu", price: 1580 },
    { time: "Fri", price: 1600 },
  ],
  "1M": [
    { time: "Week 1", price: 1400 },
    { time: "Week 2", price: 1450 },
    { time: "Week 3", price: 1500 },
    { time: "Week 4", price: 1580 },
  ],
  "6M": [
    { time: "Mar", price: 1200 },
    { time: "Apr", price: 1300 },
    { time: "May", price: 1400 },
    { time: "Jun", price: 1500 },
    { time: "Jul", price: 1600 },
    { time: "Aug", price: 1650 },
  ],
  "1Y": [
    { time: "Jan", price: 1000 },
    { time: "Feb", price: 1100 },
    { time: "Mar", price: 1200 },
    { time: "Apr", price: 1300 },
    { time: "May", price: 1400 },
    { time: "Jun", price: 1500 },
    { time: "Jul", price: 1600 },
    { time: "Aug", price: 1650 },
  ],
  All: [
    { time: "2020", price: 800 },
    { time: "2021", price: 1000 },
    { time: "2022", price: 1200 },
    { time: "2023", price: 1400 },
    { time: "2024", price: 1650 },
  ],
};

export default function PriceChart() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("Ounces");
  const [range, setRange] = useState("1Y");

  // Get dummy data based on selected range
  const data = dummyRangeData[range];

  // Dummy conversion rates for Currency
  const conversionRates = { USD: 1, INR: 83, EUR: 0.92, GBP: 0.78 };

  // Dummy unit multiplier
  const unitMultiplier = { Grams: 0.032, Ounces: 1, Kilograms: 32 };

  // Last price converted according to selected currency and unit
  const latestPrice =
    data[data.length - 1].price * conversionRates[currency] * unitMultiplier[unit];

  return (
    <div className="price-chart-section text-white">
      <h5 className="fw-bold mb-3">Price Chart</h5>

      {/* Currency Selector */}
      <div className="selector-group">
        {["USD", "INR", "EUR", "GBP"].map((c) => (
          <button
            key={c}
            className={`selector-btn ${currency === c ? "active" : ""}`}
            onClick={() => setCurrency(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Unit Selector */}
      <div className="selector-group">
        {["Grams", "Ounces", "Kilograms"].map((u) => (
          <button
            key={u}
            className={`selector-btn ${unit === u ? "active" : ""}`}
            onClick={() => setUnit(u)}
          >
            {u}
          </button>
        ))}
      </div>

      {/* Range Selector */}
      <div className="selector-group">
        {["1D", "1W", "1M", "6M", "1Y", "All"].map((r) => (
          <button
            key={r}
            className={`selector-btn ${range === r ? "active" : ""}`}
            onClick={() => setRange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Chart Card */}
      <div className="chart-card mt-3 p-3">
        <div className="mb-3">
          <h6>Gold Price ({currency}/{unit})</h6>
          <h3>
            {currency === "USD" ? "$" : ""}
            {latestPrice.toFixed(2)} {currency !== "USD" ? currency : ""}
          </h3>
          <p className="text-success">{range} +12.5%</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ background: "#222", border: "none", color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#d4af37"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
