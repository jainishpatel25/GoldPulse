// import React, { useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import "../styles/EditChange.css";

// function ChangePasswordPage() {
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

  
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setPasswordData({
//       ...passwordData,
//       [e.target.name]: e.target.value,
//     });
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setMessage("New passwords do not match!");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/change-password", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Password changed successfully!");
//         setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       setMessage("Error changing password. Please try again.");
//       console.error("Password change error:", error);
//     }
//   };


//   return (
//     <div className="profile-paage">
//       <Container className="profile-container text-center">
//         <h3 className="mb-4">Change Password</h3>
//         <Form className="text-start" onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Old Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="oldPassword"
//               value={passwordData.oldPassword}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Confirm New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               value={passwordData.confirmPassword}
//               onChange={handleChange}
//               className="profile-input"
//             />
//           </Form.Group>

//           <Button type="submit" className="save-btn w-100">
//             Update Password
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// }

// export default ChangePasswordPage;
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/EditChange.css";

function ChangePasswordPage() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("Error changing password. Please try again.");
    }
  };

  return (
    <div className="profile-paage">
      <Container className="profile-container text-center">
        <h3 className="mb-4">Change Password</h3>

        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <Form className="text-start" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              className="profile-input"
              placeholder="Enter current password"
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
              placeholder="Enter new password"
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
              placeholder="Re-enter new password"
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
