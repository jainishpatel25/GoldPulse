import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [chartData, setChartData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  const filters = ["1D", "1W", "1M", "6M", "1Y", "ALL"];

  const token = localStorage.getItem("token");

  useEffect(() => {


    const fetchChartData = async () => {
      //  setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:5000/api/investments/performance?range=${activeFilter}` ,{
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setChartData(res.data.data); // assuming { data: [...], value: 12540, change: 4.2 }
        setPortfolioValue(res.data.value);
        setChangePercent(res.data.change);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setChartData([]); // fallback
      }
      //    finally {
      //   setLoading(false);
      // }
    };

    fetchChartData();
  }, [activeFilter]);

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
            <div className="chart-value">
              ${portfolioValue.toLocaleString()}
            </div>
            <div className="chart-sub">Portfolio Value</div>
          </div>
          <div className={changePercent >= 0 ? "text-success" : "text-danger"}>
            {changePercent >= 0 ? "+" : "-"}
            {Math.abs(changePercent).toFixed(2)}%
          </div>
        </div>

        {/* Dynamic Line Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
