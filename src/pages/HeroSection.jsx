// // src/components/Overview.js
// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import "../styles/main.css";

// function Overview() {
//   return (
//     <div className="overview-container px-4 py-5">
//       <h2 className="overview-title">Gold Market Overview</h2>
//       <p className="overview-subtitle">Last updated: 10s ago</p>

//       <Row className="mt-4">
//         {/* Current Price */}
//         <Col md={4}>
//           <Card className="overview-card">
//             <Card.Body>
//               <h6 className="card-label">Current Price</h6>
//               <h3 className="card-value">$1,950.50</h3>
//               <p className="card-change">+0.27%</p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Change */}
//         <Col md={4}>
//           <Card className="overview-card">
//             <Card.Body>
//               <h6 className="card-label">Change</h6>
//               <h3 className="card-value">+ $5.20 (0.27%)</h3>
//               <p className="card-change">+0.27%</p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* High/Low */}
//         <Col md={4}>
//           <Card className="overview-card">
//             <Card.Body>
//               <h6 className="card-label">High/Low</h6>
//               <h3 className="card-value">$1,955.00 /</h3>
//               <h3 className="card-value">$1,948.00</h3>
//               <p className="card-change">+0.27%</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Overview;
import { Row, Col, Card } from "react-bootstrap";
import "../styles/main.css";

function Overview() {
  return (
    <div className="overview-container px-3 px-md-4 py-4 py-md-4">
      <h2 className="overview-title text-center text-md-start">
        Gold Market Overview
      </h2>
      <p className="overview-subtitle text-center text-md-start">
        Last updated: 10s ago
      </p>

      <Row className="mt-4">
        {/* Current Price */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">Current Price</h6>
              <h3 className="card-value">$1,950.50</h3>
              <p className="card-change">+0.27%</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Change */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">Change</h6>
              <h3 className="card-value">+ $5.20 (0.27%)</h3>
              <p className="card-change">+0.27%</p>
            </Card.Body>
          </Card>
        </Col>

        {/* High/Low */}
        <Col xs={12} sm={6} md={4} className="d-flex">
          <Card className="overview-card flex-fill">
            <Card.Body>
              <h6 className="card-label">High/Low</h6>
              <h3 className="card-value">$1,955.00 /</h3>
              <h3 className="card-value">$1,948.00</h3>
              <p className="card-change">+0.27%</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
