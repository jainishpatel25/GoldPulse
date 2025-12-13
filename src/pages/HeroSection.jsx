
import { Row, Col, Card } from "react-bootstrap";
import "../styles/main.css";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const SYMBOLS = { USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥" };
const getSymbol = (code) => SYMBOLS[code] || code || "$";

function Overview() {
  const [goldData, setGoldData] = useState(null);
  const [loading, setLoading] = useState(true);

  const prefCurrency = useMemo(
    () => (localStorage.getItem("pref_currency") || "USD").toUpperCase(),
    []
  );
  const symbol = getSymbol(prefCurrency);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/gold/live?currency=${prefCurrency}`
        );
        setGoldData(res.data);
      } catch (err) {
        console.error("Error fetching gold price:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGold();
  }, [prefCurrency]);

  if (loading) {
    return (
      <div className="overview-container px-3 px-md-4 py-4 py-md-4">
        <h2 className="overview-title text-center text-md-start">
          Gold Market Overview
        </h2>
        <p className="overview-subtitle text-center text-md-start">
          Loading gold data...
        </p>
      </div>
    );
  }

  if (!goldData) {
    return (
      <div className="overview-container px-3 px-md-4 py-4 py-md-4">
        <h2 className="overview-title text-center text-md-start">
          Gold Market Overview
        </h2>
        <p className="overview-subtitle text-center text-md-start text-danger">
          Unable to load gold data. Showing nothing for now.
        </p>
      </div>
    );
  }

  const { timestamp, price, ch, chp, high_price, low_price } = goldData;

  return (
    <div className="overview-container px-3 px-md-4 py-4 py-md-4">
      <h2 className="overview-title text-center text-md-start">
        Gold Market Overview
      </h2>
      <p className="overview-subtitle text-center text-md-start">
        Last updated:{" "}
        {timestamp
          ? new Date(timestamp * 1000).toLocaleTimeString()
          : "—"}
      </p>

      <Row className="mt-4">
        {/* Current Price */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">Current Price</h6>
              <h3 className="card-value">
                {typeof price === "number"
                  ? `${symbol}${price.toFixed(2)}`
                  : "N/A"}
              </h3>
              <p className="card-change">
                {typeof chp === "number"
                  ? `${chp > 0 ? "+" : ""}${chp.toFixed(2)}%`
                  : "N/A"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Change */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">Change</h6>
              <h3 className="card-value">
                {typeof ch === "number" && typeof chp === "number"
                  ? `${ch > 0 ? "+" : ""}${symbol}${Math.abs(ch).toFixed(
                      2
                    )} (${chp.toFixed(2)}%)`
                  : "N/A"}
              </h3>
              <p className="card-change">
                {typeof chp === "number"
                  ? `${chp > 0 ? "+" : ""}${chp.toFixed(2)}%`
                  : "N/A"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* High/Low */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">High/Low</h6>
              <h3 className="card-value">
                {typeof high_price === "number"
                  ? `${symbol}${high_price.toFixed(2)} /`
                  : "N/A /"}
              </h3>
              <h3 className="card-value">
                {typeof low_price === "number"
                  ? `${symbol}${low_price.toFixed(2)}`
                  : "N/A"}
              </h3>
              <p className="card-change">
                {typeof chp === "number"
                  ? `${chp > 0 ? "+" : ""}${chp.toFixed(2)}%`
                  : "N/A"}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
