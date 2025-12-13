// //

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import "../../styles/main.css";

// export default function PriceChart() {
//   const [currency, setCurrency] = useState("USD");
//   const [unit, setUnit] = useState("Grams"); // default to grams
//   const [range, setRange] = useState("1Y");
//   const [chartData, setChartData] = useState([]);
//   const [latestPrice, setLatestPrice] = useState(0);

//   // Fetch historical gold prices from backend
//   useEffect(() => {
//     const fetchGoldHistory = async () => {
//       try {
//         const res = await axios.get(
//           `/api/gold/history?currency=${currency}&limit=50`
//         );

//         // Convert prices according to selected unit
//         const unitMultiplier =
//           unit === "Grams" ? 1 : unit === "Ounces" ? 31.1035 : 1000; // kg

//         const data = res.data.map((item) => ({
//           time: new Date(item.timestamp).toLocaleString(),
//           price: Number((item.price * unitMultiplier).toFixed(2)),
//         }));

//         setChartData(data);
//         if (data.length) setLatestPrice(data[data.length - 1].price);
//       } catch (err) {
//         console.error("Error fetching gold history:", err);
//       }
//     };

//     fetchGoldHistory();
//   }, [currency, unit, range]);

//   return (
//     <div className="price-chart-section text-white">
//       <h5 className="fw-bold mb-3">Price Chart</h5>

//       {/* Currency Selector */}
//       <div className="selector-group">
//         {["USD", "INR", "EUR", "GBP"].map((c) => (
//           <button
//             key={c}
//             className={`selector-btn ${currency === c ? "active" : ""}`}
//             onClick={() => setCurrency(c)}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {/* Unit Selector */}
//       <div className="selector-group">
//         {["Grams", "Ounces", "Kilograms"].map((u) => (
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
//       <div className="selector-group">
//         {["1D", "1W", "1M", "6M", "1Y", "All"].map((r) => (
//           <button
//             key={r}
//             className={`selector-btn ${range === r ? "active" : ""}`}
//             onClick={() => setRange(r)}
//           >
//             {r}
//           </button>
//         ))}
//       </div>

//       {/* Chart Card */}
//       <div className="chart-card mt-3 p-3">
//         <div className="mb-3">
//           <h6>
//             Gold Price ({currency}/{unit})
//           </h6>
//           <h3>
//             {currency === "USD" ? "$" : ""}
//             {latestPrice.toFixed(2)} {currency !== "USD" ? currency : ""}
//           </h3>
//           <p className="text-success">{range} +12.5%</p>
//         </div>

//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={chartData}>
//             <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
//             <XAxis dataKey="time" stroke="#aaa" />
//             <YAxis stroke="#aaa" />
//             <Tooltip
//               contentStyle={{
//                 background: "#222",
//                 border: "none",
//                 color: "#fff",
//               }}
//             />
//             <Line
//               type="monotone"
//               dataKey="price"
//               stroke="#d4af37"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
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

const CURRENCY_SYMBOLS = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

export default function PriceChart() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("Grams"); // default to grams
  const [range, setRange] = useState("1Y");
  const [chartData, setChartData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(0);

 useEffect(() => {
  const fetchGoldHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/gold/history", // 👈 FULL backend URL
        {
          params: {
            currency,
            limit: 50,
          },
        }
      );

      console.log("Raw history response:", res.data);
      console.log("Type of res.data:", typeof res.data);
      console.log("IsArray:", Array.isArray(res.data));

      // ✅ backend already returns an array
      const items = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.history)
        ? res.data.history
        : [];

      const unitMultiplier =
        unit === "Grams" ? 1 : unit === "Ounces" ? 31.1035 : 1000; // kg

      const data = items.map((item) => {
        const ts = item.timestamp || item.date;
        return {
          time: ts ? new Date(ts).toLocaleString() : "",
          price: Number((item.price * unitMultiplier).toFixed(2)),
        };
      });

      console.log("Mapped chart data:", data);

      setChartData(data);
      if (data.length) {
        setLatestPrice(data[data.length - 1].price);
      } else {
        setLatestPrice(0);
      }
    } catch (err) {
      console.error("Error fetching gold history:", err);
      setChartData([]);
      setLatestPrice(0);
    }
  };

  fetchGoldHistory();
}, [currency, unit, range]);


  const symbol = CURRENCY_SYMBOLS[currency] || "";
  const displayPrice =
    chartData.length === 0 ? "--" : latestPrice.toFixed(2);

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

      {/* Range Selector (currently just UI – backend uses limit only) */}
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
          <h6>
            Gold Price ({currency}/{unit})
          </h6>
          <h3>
            {symbol}
            {displayPrice}
            {!symbol && chartData.length !== 0 ? ` ${currency}` : ""}
          </h3>
          {/* Fake % for now; later you can compute real change */}
          <p className="text-success">{range} +12.5%</p>
          {/* Small debug indicator so you *see* that data exists */}
          <small>Points loaded: {chartData.length}</small>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                background: "#222",
                border: "none",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#d4af37"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
