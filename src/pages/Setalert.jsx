import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/alerts.css";

// --- Spinner Input Component ---
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

// --- Main Component ---
export default function PriceAlerts() {
  const [form, setForm] = useState({
    goldType: "24K",
    condition: "Above",
    channel: "Email, In-App",
    price: "",
  });

  const [active, setActive] = useState([]);
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  // 🟢 Fetch alerts from backend
  const fetchAlerts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActive(data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // 🟡 Add new alert
  const onAdd = async (e) => {
    e.preventDefault();
    if (!form.price) return alert("Please enter a price");

    try {
      await axios.post(
        "http://localhost:5000/api/alerts",
        {
          goldType: form.goldType,
          condition: form.condition.toLowerCase(),
          price: parseFloat(form.price),
          channel: form.channel,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAlerts();
      setForm({ ...form, price: "" });
    } catch (err) {
      console.error("Error adding alert:", err);
      alert("Error creating alert");
    }
  };

  // 🔴 Delete alert
  const onDelete = async (id) => {
    if (!window.confirm("Delete this alert?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/alerts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAlerts();
    } catch (err) {
      console.error("Error deleting alert:", err);
    }
  };

  // 🟠 Edit alert (update price)
  const onEdit = async (id) => {
    const cur = active.find((a) => a._id === id);
    const next = window.prompt("Update target price (₹)", cur.price);
    if (!next || isNaN(next)) return;
    try {
      await axios.put(
        `http://localhost:5000/api/alerts/${id}`,
        { price: parseFloat(next) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAlerts();
    } catch (err) {
      console.error("Error updating alert:", err);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.warn("No token found!");

        const res = await fetch("http://localhost:5000/api/alerts/history", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch alert history: ${res.status}`);
        }

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    // 🔁 Initial fetch when page loads
    fetchHistory();

    // 🕒 Auto-refresh every 30 seconds (adjust as needed)
    const intervalId = setInterval(fetchHistory, 30000);

    // 🧹 Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
                style={{ color: "#e2e8f0" }}
              />
            </div>
          </div>

          <button type="submit" className="gold-btn">
            Set Alert
          </button>
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
                <th>Channel</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {active.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No active alerts yet.
                  </td>
                </tr>
              ) : (
                active.map((a) => (
                  <tr key={a._id}>
                    <td>{a.goldType}</td>
                    <td>{a.condition}</td>
                    <td>₹{a.price.toLocaleString()}</td>
                    <td>{a.channel}</td>
                    <td className="actions-col">
                      <button
                        type="button"
                        className="link-btn"
                        onClick={() => onEdit(a._id)}
                      >
                        Edit
                      </button>
                      <span className="sep">|</span>
                      <button
                        type="button"
                        className="link-btn danger"
                        onClick={() => onDelete(a._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- History (placeholder for now) --- */}
        <h5 className="section-title">Alert History</h5>
        <span>
          <p className="small">Auto-refreshing every 30s...</p>
        </span>
        <div className="table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Gold Type</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Triggered At</th>
                <th>Channel</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No alerts triggered yet.
                  </td>
                </tr>
              ) : (
                history.map((h) => (
                  <tr key={h._id}>
                    <td>{h.goldType}</td>
                    <td>{h.condition}</td>
                    <td>₹{h.price.toLocaleString()}</td>
                    <td>{new Date(h.createdAt).toLocaleString()}</td>
                    <td>{h.channel}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
