// // PriceAlertPage.jsx
// import React, { useState } from "react";
// import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";

// const PriceAlertPage = () => {
//   const [alerts, setAlerts] = useState([
//     { id: 1, type: "24K", condition: "Above", price: "65000", notify: "Email" },
//     { id: 2, type: "22K", condition: "Below", price: "55000", notify: "In-App" },
//   ]);

//   const [history] = useState([
//     { id: 1, type: "24K", condition: "Above", price: "60000", triggeredAt: "2025-08-01 10:00 AM" },
//     { id: 2, type: "22K", condition: "Below", price: "50000", triggeredAt: "2025-08-05 03:15 PM" },
//   ]);

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <Card className="shadow-lg p-4">
//             <h3 className="text-center mb-4">Set Price Alert</h3>

//             {/* --- Price Alert Form --- */}
//             <Form className="mb-4">
//               <Row>
//                 <Col md={6} className="mb-3">
//                   <Form.Group>
//                     <Form.Label>Gold Type</Form.Label>
//                     <Form.Select>
//                       <option>24K</option>
//                       <option>22K</option>
//                       <option>18K</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 <Col md={6} className="mb-3">
//                   <Form.Group>
//                     <Form.Label>Condition</Form.Label>
//                     <Form.Select>
//                       <option>Above</option>
//                       <option>Below</option>
//                       <option>Equals</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={6} className="mb-3">
//                   <Form.Group>
//                     <Form.Label>Target Price (₹)</Form.Label>
//                     <Form.Control type="number" placeholder="Enter price" />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6} className="mb-3">
//                   <Form.Group>
//                     <Form.Label>Notify By</Form.Label>
//                     <Form.Select>
//                       <option>Email</option>
//                       <option>In-App</option>
//                       <option>Both</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <div className="text-center">
//                 <Button variant="primary" className="px-4">
//                   Set Alert
//                 </Button>
//               </div>
//             </Form>

//             {/* --- Active Alerts Section --- */}
//             <h5 className="mb-3">Active Alerts</h5>
//             <Table bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Gold Type</th>
//                   <th>Condition</th>
//                   <th>Price</th>
//                   <th>Notify By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {alerts.map((a) => (
//                   <tr key={a.id}>
//                     <td>{a.type}</td>
//                     <td>{a.condition}</td>
//                     <td>₹{a.price}</td>
//                     <td>{a.notify}</td>
//                     <td>
//                       <Button size="sm" variant="warning" className="me-2">
//                         Edit
//                       </Button>
//                       <Button size="sm" variant="danger">
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             {/* --- Alert History Section --- */}
//             <h5 className="mt-4 mb-3">Alert History</h5>
//             <Table bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Gold Type</th>
//                   <th>Condition</th>
//                   <th>Price</th>
//                   <th>Triggered At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {history.map((h) => (
//                   <tr key={h.id}>
//                     <td>{h.type}</td>
//                     <td>{h.condition}</td>
//                     <td>₹{h.price}</td>
//                     <td>{h.triggeredAt}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PriceAlertPage;
import React, { useState } from "react";
import "../styles/alerts.css";

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
              <input
                className="control"
                type="number"
                name="price"
                placeholder="Enter price"
                value={form.price}
                onChange={onChange}
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
