import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/predication.css"; 

const fakePredictions = [
  { label: "Tomorrow", price: "$2,050.25", change: "+0.5%" },
  { label: "Next Week", price: "$2,075.50", change: "+1.7%" },
  { label: "Next Month", price: "$2,100.75", change: "+2.5%" },
];

const fakeChartData = [
  { month: "Jan", price: 1980 },
  { month: "Feb", price: 2025 },
  { month: "Mar", price: 2000 },
  { month: "Apr", price: 2040 },
  { month: "May", price: 2080 },
  { month: "Jun", price: 2100 },
];

const PredictionsPage = () => {
  return (
    <div className="predictions-page text-light py-5">
      <Container>
        {/* Heading */}
        <h2 className="fw-bold">Predictive Analytics</h2>
        <p className="text-secondary">
          Explore future gold price trends with our advanced predictive models.
        </p>

        {/* Future Predictions */}
        <Row className=" gy-3 my-4">
          {fakePredictions.map((pred, idx) => (
            <Col md={4} key={idx}>
              <Card className="predictions-card text-center h-100">
                <h5>{pred.label}</h5>
                <h4 className="fw-bold">{pred.price}</h4>
                <span className="text-success">{pred.change}</span>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Chart Section */}
        <div className="mt-5 predictions-chart">
          <h5 className="text-uppercase text-secondary">Actual vs. Predicted Gold Prices</h5>
          <h3 className="fw-bold">$2,045.00</h3>
          <p className="text-secondary">
            Last 3 Months <span className="text-success">+2.5%</span>
          </p>

          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={fakeChartData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis/>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#d4af37"
                  strokeWidth={3}
                  dot={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Note + Button */}
        <div className="mt-4 predictions-footer">
          <p className="text-secondary small">
            Note: Predictions are based on historical data and machine learning models. 
            Actual prices may vary. Confidence Level: 95%
          </p>
          <Button variant="secondary" className="predictions-export-btn">
            Export Prediction Report
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PredictionsPage;
