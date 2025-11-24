// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import "../styles/invesment.css";
// // ADD THE COMPONENT HERE - BEFORE your main GoldPage function
// const NumberInputWithSpinner = ({
//   value,
//   onChange,
//   name,
//   placeholder,
//   min = 0,
//   step = 0.01,
//   style,
// }) => {
//   const handleIncrement = () => {
//     const newValue = parseFloat(value || 0) + parseFloat(step);
//     onChange({ target: { name, value: newValue.toString() } });
//   };

//   const handleDecrement = () => {
//     const currentValue = parseFloat(value || 0);
//     const newValue = Math.max(min, currentValue - parseFloat(step));
//     onChange({ target: { name, value: newValue.toString() } });
//   };

//   return (
//     <div className="number-input-wrapper">
//       <input
//         type="number"
//         className="form-control"
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         min={min}
//         step={step}
//         style={style}
//       />
//       <div className="spinner-buttons">
//         <button
//           type="button"
//           className="spinner-btn up"
//           onClick={handleIncrement}
//         />
//         <button
//           type="button"
//           className="spinner-btn down"
//           onClick={handleDecrement}
//         />
//       </div>
//     </div>
//   );
// };


// function GoldPage() {
//   const [holdings, setHoldings] = useState([]);
//   const [form, setForm] = useState({
//     quantity: "",
//     price: "",
//     type: "",
//     date: "",
//   });
//   const [filter, setFilter] = useState("All");

//   const token = localStorage.getItem("token");
//   if (!token) {
//   console.error("No token found. Redirecting to login.");
//   return;
// }


//   // 🔄 Fetch holdings from backend
//   useEffect(() => {
//     const fetchHoldings = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/investments" ,{
//           headers: { Authorization: `Bearer ${token}` }

//         });

//         const mapped = res.data.map((item) => ({
//           _id: item._id,
//           type: item.type,
//           quantity: item.quantity,
//           value: item.totalValue,
//           date: item.date,
//         }));
//         setHoldings(mapped);
//       } catch (err) {
//         console.error("Error fetching holdings:", err);
//       }
//     };
//     fetchHoldings();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.quantity || !form.price || !form.type) return;

//     const payload = {
//       type: form.type,
//       quantity: parseFloat(form.quantity),
//       pricePerGram: parseFloat(form.price),
//       date: form.date || new Date().toISOString(),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/investments", 
//         payload,
//          { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const newItem = {
//         _id: res.data._id,
//         type: res.data.type,
//         quantity: res.data.quantity,
//         value: res.data.totalValue,
//         date: res.data.date,
//       };
//       setHoldings((prev) => [newItem, ...prev]);
//       setForm({ quantity: "", price: "", type: "", date: "" });
//     } catch (err) {
//       console.error("Error adding investment:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/investments/${id}`,{ headers: { Authorization: `Bearer ${token}` }
// });
//       setHoldings((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error("Error deleting investment:", err);
//     }
//   };

//   const filteredHoldings =
//     filter === "All" ? holdings : holdings.filter((h) => h.type === filter);
//   const currentGoldPrice = 6400; // ₹/g or $/g depending on your units
//   const totalValue = holdings.reduce((acc, h) => acc + h.value, 0);
//   const totalQuantity = holdings.reduce((acc, h) => acc + h.quantity, 0);
//   const avgPrice = totalQuantity ? totalValue / totalQuantity : 0;
//   const marketValue = holdings.reduce(
//     (acc, h) => acc + h.quantity * currentGoldPrice,
//     0
//   );
//   const profitLoss = marketValue - totalValue;
//   const profitPercent = totalValue ? (profitLoss / totalValue) * 100 : 0;

//   return (
//     <div className="p-4 gold-page">
//       {/* Heading */}
//       <h3 className="mb-4">My Gold</h3>

//       {/* Stats */}
//       <div className="row g-3 mb-4">
//         {[
//           {
//             label: "Total Investment Value",
//             value: `$${totalValue.toLocaleString()}`,
//             sub: "",
//           },
//           {
//             label: "Overall Profit/Loss",
//             value: `${profitLoss >= 0 ? "+" : "-"}$${Math.abs(
//               profitLoss
//             ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,

//             sub: `${profitLoss >= 0 ? "+" : "-"}${Math.abs(
//               profitPercent
//             ).toFixed(2)}%`,

//             subClass: profitLoss >= 0 ? "text-success" : "text-danger",
//             valueClass: profitLoss >= 0 ? "text-success" : "text-danger",
//           },
//           { label: "Total Quantity", value: `${totalQuantity}g`, sub: "" },
//           {
//             label: "Average Price",
//             value: `$${avgPrice.toFixed(2)}/g`,
//             sub: "",
//           },
//         ].map((stat, idx) => (
//           <div key={idx} className="col-12 col-sm-6 col-md-3">
//             <div className="stat-card h-100 d-flex flex-column justify-content-center">
//               {/* <p className="label">{stat.label}</p> */}
//               <p className="label" title={stat.label}>
//                 {stat.label}
//               </p>
//               <h4 className={stat.valueClass || ""}>{stat.value}</h4>
//               {stat.sub && (
//                 <small className={stat.subClass || ""}>{stat.sub}</small>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Form */}
//       <div className="form-section mb-5">
//         <h5 className="mb-3">Add Gold Purchase</h5>
//         <form className="gold-form" onSubmit={handleSubmit}>
//           <div className="row mb-3 g-2 g-md-3">
//             <div className="col-12 col-sm-6">
//               <NumberInputWithSpinner
//                 name="quantity"
//                 placeholder="Quantity (g)"
//                 value={form.quantity}
//                 onChange={handleChange}
//                 min={0.01}
//                 step={0.01}
//                 style={{
//                   backgroundColor: "#222",
//                   borderColor: "#4a5568",
//                   color: "#e2e8f0",
//                 }}
//               />
//             </div>
//             <div className="col-12 col-sm-6">
//               <NumberInputWithSpinner
//                 name="price"
//                 placeholder="Price ($/g)"
//                 value={form.price}
//                 onChange={handleChange}
//                 min={0.01}
//                 step={0.01}
//                 style={{
//                   backgroundColor: "#222",
//                   borderColor: "#4a5568",
//                   color: "#e2e8f0",
//                 }}
//               />
//             </div>
//           </div>

//           <div className="row mb-3 g-2 g-md-3">
//             <div className="col-12 col-sm-6">
//               <select
//                 className="form-control"
//                 name="type"
//                 value={form.type}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: "#222",
//                   borderColor: "#4a5568",
//                   color: "#e2e8f0",
//                 }}
//               >
//                 <option
//                   value=""
//                   style={{ backgroundColor: "#222", color: "#e2e8f0" }}
//                 >
//                   Select Gold Type
//                 </option>
//                 <option
//                   value="Gold Bars"
//                   style={{ backgroundColor: "#222", color: "#e2e8f0" }}
//                 >
//                   Gold Bars
//                 </option>
//                 <option
//                   value="Gold Coins"
//                   style={{ backgroundColor: "#222", color: "#e2e8f0" }}
//                 >
//                   Gold Coins
//                 </option>
//                 <option
//                   value="Jewelry"
//                   style={{ backgroundColor: "#222", color: "#e2e8f0" }}
//                 >
//                   Jewelry
//                 </option>
//               </select>
//             </div>
//             <div className="col-12 col-sm-6">
//               <input
//                 type="date"
//                 className="form-control"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: "#222",
//                   borderColor: "#4a5568",
//                   color: "#e2e8f0",
//                 }}
//               />
//             </div>
//           </div>

//           {form.quantity && form.price && form.type && (
//             <p className="preview">
//               Preview: {form.quantity}g of {form.type} @ ${form.price}/g = $
//               {(form.quantity * form.price).toLocaleString()}
//             </p>
//           )}

//           <button type="submit" className="btn add-btn mt-2">
//             Add Purchase
//           </button>
//         </form>
//       </div>
//       {/* Holdings */}
//       <h5 className="mb-3">Gold Holdings Breakdown</h5>

//       {/* Filter Buttons */}
//       <div className="mb-3">
//         {["All", "Gold Bars", "Gold Coins", "Jewelry"].map((category) => (
//           <button
//             key={category}
//             className={`filter-btn ${filter === category ? "active" : ""}`}
//             onClick={() => setFilter(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="gold-pages">
//         <div className="table-responsive">
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th data-label="Type">Type</th>
//                 <th data-label="Quantity">Quantity</th>
//                 <th data-label="Value">Value</th>
//                 <th data-label="Value">Delete</th>
//                 <th data-label="Date">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredHoldings.length > 0 ? (
//                 filteredHoldings.map((h, idx) => (
//                   <tr key={idx}>
//                     <td data-label="Type">{h.type}</td>
//                     <td data-label="Quantity">{h.quantity}g</td>
//                     <td data-label="Value">${h.value.toLocaleString()}</td>
//                     <td data-label="Date">
//                       {new Date(h.date).toLocaleDateString("en-IN", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(h._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center">
//                     No holdings available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GoldPage;
// src/pages/GoldPage.jsx  (replace your existing file)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { convertToUSD } from "../utils/currencyConverter";

import "../styles/invesment.css";
// ADD THE COMPONENT HERE - BEFORE your main GoldPage function
const NumberInputWithSpinner = ({
  value,
  onChange,
  name,
  placeholder,
  min = 0,
  step = 0.01,
  style,
}) => {
  const handleIncrement = () => {
    const newValue = parseFloat(value || 0) + parseFloat(step);
    onChange({ target: { name, value: newValue.toString() } });
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value || 0);
    const newValue = Math.max(min, currentValue - parseFloat(step));
    onChange({ target: { name, value: newValue.toString() } });
  };

  return (
    <div className="number-input-wrapper">
      <input
        type="number"
        className="form-control"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        style={style}
      />
      <div className="spinner-buttons">
        <button
          type="button"
          className="spinner-btn up"
          onClick={handleIncrement}
        />
        <button
          type="button"
          className="spinner-btn down"
          onClick={handleDecrement}
        />
      </div>
    </div>
  );
};

function GoldPage() {
  const [holdings, setHoldings] = useState([]);
  const [form, setForm] = useState({
    quantity: "",
    price: "",
    type: "",
    date: "",
  });
  const [filter, setFilter] = useState("All");
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("pref_currency") || "USD";
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. Redirecting to login.");
    // You might want to redirect here using navigate, but keep behavior same as before
    return null;
  }

  // currency symbol map
  const CURRENCY_SYMBOLS = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
  };

  // Helper: get symbol
  const currencySymbol = (c = currency) => CURRENCY_SYMBOLS[c] || c;

  // 🔄 Fetch holdings from backend (handles both old and new response shapes)
  const fetchHoldings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/investments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Backend may return either:
      // 1) an array directly (legacy): res.data = [ ... ]
      // 2) an object { preferredCurrency, investments: [...] }
      let preferredCurrency = localStorage.getItem("pref_currency") || "USD";
      let investments = [];

      if (Array.isArray(res.data)) {
        investments = res.data;
      } else if (res.data && res.data.investments) {
        investments = res.data.investments;
        if (res.data.preferredCurrency) preferredCurrency = res.data.preferredCurrency;
      } else {
        // Try to guess if server returned { ... } with direct investments array in a key
        investments = res.data.investments || [];
      }

      // Map investments into UI-friendly shape
      const mapped = investments.map((item) => ({
        _id: item._id,
        type: item.type,
        quantity: item.quantity,
        // original stored USD totalValue (if available)
        value: item.totalValue !== undefined ? Number(item.totalValue) : 0,
        // server-provided converted fields (may be undefined)
        convertedTotalValue:
          item.convertedTotalValue !== undefined
            ? Number(item.convertedTotalValue)
            : undefined,
        convertedPricePerGram:
          item.convertedPricePerGram !== undefined
            ? Number(item.convertedPricePerGram)
            : undefined,
        date: item.date,
      }));

      setHoldings(mapped);
      setCurrency(preferredCurrency);
      localStorage.setItem("pref_currency", preferredCurrency);
    } catch (err) {
      console.error("Error fetching holdings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
    // listen for currency changes made in profile (other tab)
    const onStorage = (e) => {
      if (e.key === "pref_currency") {
        const newCurrency = e.newValue || "USD";
        setCurrency(newCurrency);
        // refetch holdings so we get server converted values (if server supports)
        fetchHoldings();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.quantity || !form.price || !form.type) return;

  const prefCurrency = localStorage.getItem("pref_currency") || "USD";

  try {
    // ✅ Convert user-entered price to USD before sending
    const priceInUSD = await convertToUSD(parseFloat(form.price), prefCurrency);

    const payload = {
      type: form.type,
      quantity: parseFloat(form.quantity),
      pricePerGram: priceInUSD, // send in USD
      date: form.date || new Date().toISOString(),
    };

    const res = await axios.post("http://localhost:5000/api/investments", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchHoldings(); // refresh data
    setForm({ quantity: "", price: "", type: "", date: "" });
  } catch (err) {
    console.error("Error adding investment:", err);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/investments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHoldings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting investment:", err);
    }
  };

  const filteredHoldings =
    filter === "All" ? holdings : holdings.filter((h) => h.type === filter);

  // Totals: prefer server-provided converted values if available.
  const totalValueConverted = filteredHoldings.reduce((acc, h) => {
    if (h.convertedTotalValue !== undefined) return acc + h.convertedTotalValue;
    // fallback to raw stored USD 'value' (displayed as USD if conversion not present)
    return acc + (h.value || 0);
  }, 0);

  const totalQuantity = filteredHoldings.reduce((acc, h) => acc + (h.quantity || 0), 0);

  // average price: use converted per-gram if available
  const avgPriceConverted =
    totalQuantity > 0
      ? filteredHoldings.reduce((acc, h) => {
          if (h.convertedPricePerGram !== undefined) {
            return acc + h.convertedPricePerGram * (h.quantity || 0);
          }
          // fallback to price computed from value / quantity (raw USD)
          const perGram = h.quantity ? (h.value || 0) / h.quantity : 0;
          return acc + perGram * (h.quantity || 0);
        }, 0) / totalQuantity
      : 0;

  // Market value and profit/loss: we can show in preferred currency if server provides converted per-item or converted totals.
  // We'll compute marketValueConverted by using converted per-gram if available; otherwise fallback to currentGoldPrice * quantity
  const currentGoldPriceInSelectedCurrency = null; // if you have live price endpoint, fetch it and provide here
  const marketValueConverted = filteredHoldings.reduce((acc, h) => {
    if (h.convertedPricePerGram !== undefined) {
      return acc + h.convertedPricePerGram * (h.quantity || 0);
    }
    // fallback: if we don't have converted per-gram, use stored value as-is (assumed USD)
    return acc + (h.quantity || 0) * (currentGoldPriceInSelectedCurrency || 0);
  }, 0);

  // If we cannot compute marketValueConverted (no convertedPrice & no live converted price), fall back to 0 and calculate profitLoss from server converted totals
  const profitLossConverted =
    totalValueConverted && marketValueConverted ? marketValueConverted - totalValueConverted : 0;
  const profitPercent = totalValueConverted ? (profitLossConverted / totalValueConverted) * 100 : 0;

  // Helpers to format numbers nicely
  const formatMoney = (amount) => {
    if (amount === undefined || amount === null) return "-";
    return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // preview uses current currency symbol for UX clarity (note: backend expects pricePerGram in USD unless you change server)
  const previewTotal = () => {
    const qty = parseFloat(form.quantity || 0);
    const price = parseFloat(form.price || 0);
    return qty && price ? formatMoney(qty * price) : null;
  };

  return (
    <div className="p-4 gold-page">
      {/* Heading */}
      <h3 className="mb-4">My Gold</h3>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          {
            label: "Total Investment Value",
            value:
              totalValueConverted > 0
                ? `${currencySymbol(currency)}${formatMoney(totalValueConverted)}`
                : `$${formatMoney(totalValueConverted)}`,
            sub: "",
          },
          {
            label: "Overall Profit/Loss",
            value:
              profitLossConverted !== 0
                ? `${profitLossConverted >= 0 ? "+" : "-"}${currencySymbol(currency)}${formatMoney(Math.abs(profitLossConverted))}`
                : `${profitLossConverted >= 0 ? "+" : "-"}$${formatMoney(Math.abs(profitLossConverted))}`,
            sub: `${profitLossConverted >= 0 ? "+" : "-"}${Math.abs(profitPercent).toFixed(2)}%`,
            subClass: profitLossConverted >= 0 ? "text-success" : "text-danger",
            valueClass: profitLossConverted >= 0 ? "text-success" : "text-danger",
          },
          { label: "Total Quantity", value: `${totalQuantity}g`, sub: "" },
          {
            label: "Average Price",
            value:
              avgPriceConverted > 0
                ? `${currencySymbol(currency)}${formatMoney(avgPriceConverted)}/g`
                : `$${formatMoney(avgPriceConverted)}/g`,
            sub: "",
          },
        ].map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-3">
            <div className="stat-card h-100 d-flex flex-column justify-content-center">
              <p className="label" title={stat.label}>
                {stat.label}
              </p>
              <h4 className={stat.valueClass || ""}>{stat.value}</h4>
              {stat.sub && <small className={stat.subClass || ""}>{stat.sub}</small>}
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      <div className="form-section mb-5">
        <h5 className="mb-3">Add Gold Purchase</h5>
        <form className="gold-form" onSubmit={handleSubmit}>
          <div className="row mb-3 g-2 g-md-3">
            <div className="col-12 col-sm-6">
              <NumberInputWithSpinner
                name="quantity"
                placeholder="Quantity (g)"
                value={form.quantity}
                onChange={handleChange}
                min={0.01}
                step={0.01}
                style={{
                  backgroundColor: "#222",
                  borderColor: "#4a5568",
                  color: "#e2e8f0",
                }}
              />
            </div>
            <div className="col-12 col-sm-6">
              <NumberInputWithSpinner
                name="price"
                placeholder={`Price (${currencySymbol(currency)}/g)`}
                value={form.price}
                onChange={handleChange}
                min={0.01}
                step={0.01}
                style={{
                  backgroundColor: "#222",
                  borderColor: "#4a5568",
                  color: "#e2e8f0",
                }}
              />
            </div>
          </div>

          <div className="row mb-3 g-2 g-md-3">
            <div className="col-12 col-sm-6">
              <select
                className="form-control"
                name="type"
                value={form.type}
                onChange={handleChange}
                style={{
                  backgroundColor: "#222",
                  borderColor: "#4a5568",
                  color: "#e2e8f0",
                }}
              >
                <option value="" style={{ backgroundColor: "#222", color: "#e2e8f0" }}>
                  Select Gold Type
                </option>
                <option value="Gold Bars" style={{ backgroundColor: "#222", color: "#e2e8f0" }}>
                  Gold Bars
                </option>
                <option value="Gold Coins" style={{ backgroundColor: "#222", color: "#e2e8f0" }}>
                  Gold Coins
                </option>
                <option value="Jewelry" style={{ backgroundColor: "#222", color: "#e2e8f0" }}>
                  Jewelry
                </option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <input
                type="date"
                className="form-control"
                name="date"
                value={form.date}
                onChange={handleChange}
                style={{
                  backgroundColor: "#222",
                  borderColor: "#4a5568",
                  color: "#e2e8f0",
                }}
              />
            </div>
          </div>

          {form.quantity && form.price && form.type && (
            <p className="preview">
              Preview: {form.quantity}g of {form.type} @ {currencySymbol(currency)}
              {formatMoney(form.price)}/g = {currencySymbol(currency)}
              {previewTotal()}
            </p>
          )}

          <button type="submit" className="btn add-btn mt-2">
            Add Purchase
          </button>
        </form>
      </div>
      {/* Holdings */}
      <h5 className="mb-3">Gold Holdings Breakdown</h5>

      {/* Filter Buttons */}
      <div className="mb-3">
        {["All", "Gold Bars", "Gold Coins", "Jewelry"].map((category) => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? "active" : ""}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="gold-pages">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th data-label="Type">Type</th>
                <th data-label="Quantity">Quantity</th>
                <th data-label="Value">Value</th>
                <th data-label="Value">Delete</th>
                <th data-label="Date">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.length > 0 ? (
                filteredHoldings.map((h, idx) => (
                  <tr key={idx}>
                    <td data-label="Type">{h.type}</td>
                    <td data-label="Quantity">{h.quantity}g</td>
                    <td data-label="Value">
                      {h.convertedTotalValue !== undefined ? (
                        <>
                          {currencySymbol(currency)}
                          {formatMoney(h.convertedTotalValue)}
                        </>
                      ) : (
                        <>
                          ${formatMoney(h.value)}
                        </>
                      )}
                    </td>
                    <td data-label="Date">
                      {new Date(h.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(h._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No holdings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GoldPage;
