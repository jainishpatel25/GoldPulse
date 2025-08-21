import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/custom.css";

function InvestmentPerformance() {
  const [activeFilter, setActiveFilter] = useState("1M");

  const filters = ["1D", "1W", "1M", "6M", "1Y", "ALL"];

  // Different datasets for each filter
  const chartData = {
    "1D": [
      { name: "9AM", value: 10000 },
      { name: "12PM", value: 10120 },
      { name: "3PM", value: 10080 },
      { name: "6PM", value: 10250 },
    ],
    "1W": [
      { name: "Mon", value: 9800 },
      { name: "Tue", value: 10050 },
      { name: "Wed", value: 10100 },
      { name: "Thu", value: 9900 },
      { name: "Fri", value: 10200 },
    ],
    "1M": [
      { name: "Week 1", value: 10000 },
      { name: "Week 2", value: 11200 },
      { name: "Week 3", value: 10800 },
      { name: "Week 4", value: 12540 },
    ],
    "6M": [
      { name: "Jan", value: 10000 },
      { name: "Feb", value: 11200 },
      { name: "Mar", value: 10800 },
      { name: "Apr", value: 12000 },
      { name: "May", value: 12540 },
      { name: "Jun", value: 13000 },
    ],
    "1Y": [
      { name: "Q1", value: 9500 },
      { name: "Q2", value: 10500 },
      { name: "Q3", value: 12000 },
      { name: "Q4", value: 12540 },
    ],
    ALL: [
      { name: "2019", value: 7000 },
      { name: "2020", value: 9000 },
      { name: "2021", value: 11000 },
      { name: "2022", value: 12000 },
      { name: "2023", value: 12540 },
    ],
  };

  return (
    <div className="page-container">
      {/* Title */}
      <h2 className="title">Investment Performance</h2>

      {/* Filter Buttons */}
      <div className="time-filters mb-3">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`me-2 ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Chart Card */}
      <div className="chart-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="chart-value">$12,540</div>
            <div className="chart-sub">Portfolio Value</div>
          </div>
          <div className="text-success">+4.2%</div>
        </div>

        {/* Dynamic Line Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData[activeFilter]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1c1b19", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4caf50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InvestmentPerformance;
