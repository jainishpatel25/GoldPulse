// // src/components/PriceChart.js
// import React, { useState } from "react";
// import "../../styles/main.css";

// function PriceChart() {
//   const [currency, setCurrency] = useState("USD");
//   const [unit, setUnit] = useState("Ounces");
//   const [range, setRange] = useState("1Y");

//   const currencies = ["USD", "INR", "EUR", "GBP"];
//   const units = ["Grams", "Ounces", "Kilograms"];
//   const ranges = ["1D", "1W", "1M", "6M", "1Y", "All"];

//   return (
//     <div className="pricechart-container px-4 py-4">
//       <h5 className="section-title">Price Chart</h5>

//       {/* Currency Selector */}
//       <div className="btn-group-container">
//         {currencies.map((cur) => (
//           <button
//             key={cur}
//             className={`selector-btn ${currency === cur ? "active" : ""}`}
//             onClick={() => setCurrency(cur)}
//           >
//             {cur}
//           </button>
//         ))}
//       </div>

//       {/* Unit Selector */}
//       <div className="btn-group-container">
//         {units.map((u) => (
//           <button
//             key={u}
//             className={`selector-btn ${unit === u ? "active" : ""}`}
//             onClick={() => setUnit(u)}
//           >
//             {u}
//           </button>
//         ))}
//       </div>

//       {/* Range Selector */}
//       <div className="btn-group-container">
//         {ranges.map((r) => (
//           <button
//             key={r}
//             className={`selector-btn ${range === r ? "active" : ""}`}
//             onClick={() => setRange(r)}
//           >
//             {r}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PriceChart;
import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import "../../styles/main.css";

const data = [
  { month: "Jan", price: 0 },
  { month: "Feb", price: 850 },
  { month: "Mar", price: 1020 },
  { month: "Apr", price: 1400 },
  { month: "May", price: 1580 },
  { month: "Jun", price: 1650 },
//   { month: "Jul", price: 1940 },
];

export default function PriceChart() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("Ounces");
  const [range, setRange] = useState("1Y");

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
          <h3>${data[data.length - 1].price.toFixed(2)}</h3>
          <p className="text-success">1Y +12.5%</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="month" stroke="#aaa" />
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
