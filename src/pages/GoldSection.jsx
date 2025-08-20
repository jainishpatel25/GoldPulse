import React, { useState } from "react";
import "../styles/main.css"; // dark theme CSS

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
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="stat-card">
            <p className="label">Total Investment Value</p>
            <h4>${totalValue.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <p className="label">Overall Profit/Loss</p>
            <h4 className="text-success">+${500}</h4>
            <small className="text-success">+4.2%</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <p className="label">Total Quantity</p>
            <h4>{totalQuantity}g</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <p className="label">Average Price</p>
            <h4>${avgPrice.toFixed(2)}/g</h4>
          </div>
        </div>
      </div>

      {/* Add Form */}
      <div className="form-section mb-5">
        <h5 className="mb-3">Add Gold Purchase</h5>
        <form className="gold-form" onSubmit={handleSubmit}>
          <div className="row mb-3 g-3">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Quantity (g)"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price ($/g)"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3 g-3">
            <div className="col-md-6">
              <select
                className="form-control"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">Select Gold Type</option>
                <option value="Gold Bars">Gold Bars</option>
                <option value="Gold Coins">Gold Coins</option>
                <option value="Jewelry">Jewelry</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                name="date"
                value={form.date}
                onChange={handleChange}
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
      {/* <h5 className="mb-3">Gold Holdings Breakdown</h5>
      <div className="mb-3">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Bars</button>
        <button className="filter-btn">Coins</button>
        <button className="filter-btn">Jewelry</button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, idx) => (
              <tr key={idx}>
                <td>{h.type}</td>
                <td>{h.quantity}g</td>
                <td>${h.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
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
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.length > 0 ? (
              filteredHoldings.map((h, idx) => (
                <tr key={idx}>
                  <td>{h.type}</td>
                  <td>{h.quantity}g</td>
                  <td>${h.value.toLocaleString()}</td>
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
  );
}

export default GoldPage;
