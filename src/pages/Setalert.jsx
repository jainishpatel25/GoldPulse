
import React, { useState } from "react";
import "../styles/alerts.css";

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
        className="control"
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


export default function PriceAlerts() {
  // ---- fake data (frontend only) ----
  const [form, setForm] = useState({
    goldType: "24K",
    condition: "Above",
    channel: "Email, In-App",
    price: "",
  });

  const [active, setActive] = useState([
    { id: 1, type: "24K", condition: "Above", price: 1800, notify: "Email, In-App" },
    { id: 2, type: "22K", condition: "Below", price: 1750, notify: "In-App" },
    { id: 3, type: "24K", condition: "Equals", price: 1900, notify: "Email" },
  ]);

  const [history] = useState([
    { id: 11, type: "24K", condition: "Above", price: 1800, at: "2023-08-15 10:00 AM" },
    { id: 12, type: "22K", condition: "Below", price: 1750, at: "2023-07-20 02:30 PM" },
    { id: 13, type: "24K", condition: "Equals", price: 1900, at: "2023-06-05 09:45 AM" },
  ]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onAdd = (e) => {
    e.preventDefault();
    if (!form.price) return;
    setActive((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: form.goldType,
        condition: form.condition,
        price: Number(form.price),
        notify: form.channel,
      },
    ]);
    setForm({ ...form, price: "" });
  };

  const onDelete = (id) => setActive((prev) => prev.filter((a) => a.id !== id));
  const onEdit = (id) => {
    const cur = active.find((a) => a.id === id);
    const next = window.prompt("Update target price ($)", cur.price);
    if (next && !isNaN(next)) {
      setActive((prev) =>
        prev.map((a) => (a.id === id ? { ...a, price: Number(next) } : a))
      );
    }
  };

  return (
    <div className="alerts-page">
      <div className="alerts-wrap">
        <h2 className="page-title">Set Price Alert</h2>

        {/* --- Form --- */}
        <form className="alert-form" onSubmit={onAdd}>
          <div className="row">
            <div className="col">
              <select
                className="control"
                name="goldType"
                value={form.goldType}
                onChange={onChange}
              >
                <option>24K</option>
                <option>22K</option>
                <option>18K</option>
              </select>
            </div>
            <div className="col">
              <select
                className="control"
                name="condition"
                value={form.condition}
                onChange={onChange}
              >
                <option>Above</option>
                <option>Below</option>
                <option>Equals</option>
              </select>
            </div>
            <div className="col">
              <select
                className="control"
                name="channel"
                value={form.channel}
                onChange={onChange}
              >
                <option>Email</option>
                <option>In-App</option>
                <option>Email, In-App</option>
              </select>
            </div>
           <div className="col">
  <NumberInputWithSpinner
    name="price"
    placeholder="Enter price"
    value={form.price}
    onChange={onChange}
    min={0.01}
    step={0.01}
    style={{
      // backgroundColor: '#2d3748',
      // borderColor: '#4a5568',
      color: '#e2e8f0'
    }}
  />
</div>

          </div>

          <button type="submit" className="gold-btn">Set Alert</button>
        </form>

        {/* --- Active Alerts --- */}
        <h5 className="section-title">Active Alerts</h5>
        <div className="table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Gold Type</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Notifications</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {active.map((a) => (
                <tr key={a.id}>
                  <td>{a.type}</td>
                  <td>{a.condition}</td>
                  <td>${a.price.toLocaleString()}</td>
                  <td>{a.notify}</td>
                  <td className="actions-col">
                    <button type="button" className="link-btn" onClick={() => onEdit(a.id)}>
                      Edit
                    </button>
                    <span className="sep">|</span>
                    <button type="button" className="link-btn danger" onClick={() => onDelete(a.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- History --- */}
        <h5 className="section-title">Alert History</h5>
        <div className="table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Gold Type</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Triggered At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{h.type}</td>
                  <td>{h.condition}</td>
                  <td>${h.price.toLocaleString()}</td>
                  <td>{h.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
