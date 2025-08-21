import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/EditChange.css";

function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    phone: "+91 9876543210",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-paage">
      <Container className="profile-container text-center">
        <h3 className="mb-4">Edit Profile</h3>
        <Form className="text-start" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="profile-input"
            />
          </Form.Group>

          <Button type="submit" className="save-btn w-100">
            Save Changes
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfilePage;
