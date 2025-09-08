import React, { useState } from "react";
import "../styles/invesment.css"
// ADD THE COMPONENT HERE - BEFORE your main GoldPage function
const NumberInputWithSpinner = ({ value, onChange, name, placeholder, min = 0, step = 0.01, style }) => {
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
  const [holdings, setHoldings] = useState([
    { type: "Gold Bars", quantity: 300, value: 7500 },
    { type: "Gold Coins", quantity: 200, value: 5000 },
     { type: "Bars", quantity: 200, value: 12000 },
    { type: "Coins", quantity: 150, value: 8500 },
    { type: "Jewelry", quantity: 300, value: 20000 },
    { type: "Bars", quantity: 100, value: 6000 },
  ]);

  const [form, setForm] = useState({
    quantity: "",
    price: "",
    type: "",
    date: "",
  });

  const totalValue = holdings.reduce((acc, h) => acc + h.value, 0);
  const totalQuantity = holdings.reduce((acc, h) => acc + h.quantity, 0);
  const avgPrice = totalQuantity ? totalValue / totalQuantity : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.quantity || !form.price || !form.type) return;

    const value = form.quantity * form.price;
    setHoldings([...holdings, { type: form.type, quantity: +form.quantity, value }]);

    setForm({ quantity: "", price: "", type: "", date: "" });
  };

  const [filter, setFilter] = useState("All");

  const holdingss = [
    { type: "Bars", quantity: 200, value: 12000 },
    { type: "Coins", quantity: 150, value: 8500 },
    { type: "Jewelry", quantity: 300, value: 20000 },
    { type: "Bars", quantity: 100, value: 6000 },
  ];

  // Apply filter logic
  const filteredHoldings =
    filter === "All"
      ? holdings
      : holdings.filter((h) => h.type === filter);


  return (
    <div className="p-4 gold-page">
      {/* Heading */}
      <h3 className="mb-4">My Gold</h3>

{/* Stats */}
<div className="row g-3 mb-4">
  {[
    { label: "Total Investment Value", value: `$${totalValue.toLocaleString()}`, sub: "" },
    { label: "Overall Profit/Loss", value: `+$${500}`, sub: "+4.2%", subClass: "text-success", valueClass: "text-success" },
    { label: "Total Quantity", value: `${totalQuantity}g`, sub: "" },
    { label: "Average Price", value: `$${avgPrice.toFixed(2)}/g`, sub: "" },
  ].map((stat, idx) => (
    <div key={idx} className="col-12 col-sm-6 col-md-3">
      <div className="stat-card h-100 d-flex flex-column justify-content-center">
        <p className="label">{stat.label}</p>
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
    step={1}
    style={{
      backgroundColor: '#222',
      borderColor: '#4a5568',
      color: '#e2e8f0'
    }}
  />
</div>
      <div className="col-12 col-sm-6">
  <NumberInputWithSpinner
    name="price"
    placeholder="Price ($/g)"
    value={form.price}
    onChange={handleChange}
    min={0.01}
    step={1}
    style={{
      backgroundColor: '#222',
      borderColor: '#4a5568',
      color: '#e2e8f0'
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
            backgroundColor: '#222',
            borderColor: '#4a5568',
            color: '#e2e8f0'
          }}
        >
          <option value="" style={{backgroundColor: '#222', color: '#e2e8f0'}}>Select Gold Type</option>
          <option value="Gold Bars" style={{backgroundColor: '#222', color: '#e2e8f0'}}>Gold Bars</option>
          <option value="Gold Coins" style={{backgroundColor: '#222', color: '#e2e8f0'}}>Gold Coins</option>
          <option value="Jewelry" style={{backgroundColor: '#222', color: '#e2e8f0'}}>Jewelry</option>
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
            backgroundColor: '#222',
            borderColor: '#4a5568',
            color: '#e2e8f0'
          }}
        />
      </div>
    </div>

    {form.quantity && form.price && form.type && (
      <p className="preview">
        Preview: {form.quantity}g of {form.type} @ ${form.price}/g = $
        {(form.quantity * form.price).toLocaleString()}
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
        {["All", "Bars", "Coins", "Jewelry"].map((category) => (
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
                <th data-label="Type">Typde</th>
                <th data-label="Quantity">Quantity</th>
                <th data-label="Value">Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.length > 0 ? (
                filteredHoldings.map((h, idx) => (
                  <tr key={idx}>
                    <td data-label="Type">{h.type}</td>
                    <td data-label="Quantity">{h.quantity}g</td>
                    <td data-label="Value">${h.value.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
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
