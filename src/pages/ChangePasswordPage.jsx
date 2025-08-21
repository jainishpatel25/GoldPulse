import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/EditChange.css";

function ChangePasswordPage() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password Updated:", passwordData);
    alert("Password Changed Successfully!");
  };

  return (
    <div className="profile-paage">
      <Container className="profile-container text-center">
        <h3 className="mb-4">Change Password</h3>
        <Form className="text-start" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Button type="submit" className="save-btn w-100">
            Update Password
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default ChangePasswordPage;
