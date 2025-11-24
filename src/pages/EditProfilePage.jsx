// import React, { useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import "../styles/EditChange.css";

// function EditProfilePage() {
//   const [formData, setFormData] = useState();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Profile:", formData);
//     alert("Profile Updated Successfully!");
//   };

  

//   return (
//     <div className="profile-paage">
//       <Container className="profile-container text-center">
//         <h3 className="mb-4">Edit Profile</h3>
//         <Form className="text-start" onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Button type="submit" className="save-btn w-100">
//             Save Changes
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// }

// export default EditProfilePage;
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/EditChange.css";

function EditProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user data on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          profilePic: data.profilePic || "",
        });
      } catch (error) {
        console.error("Error loading profile:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle save button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-paage text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

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
              required
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
              required
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

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture (URL)</Form.Label>
            <Form.Control
              type="text"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              className="profile-input"
              placeholder="https://example.com/photo.jpg"
            />
          </Form.Group>

          <Button
            type="submit"
            className="save-btn w-100"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfilePage;
