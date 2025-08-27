
// import React from "react";
// import "../styles/Profile.css";
// import { Container, Dropdown, Button } from "react-bootstrap";
// import { FaEdit, FaLock, FaChevronDown } from "react-icons/fa";

// function ProfilePage() {
//   return (
//     <div className="profile-paage">
//       {/* Profile Section */}
//       <Container className="profile-container text-center">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
//           alt="avatar"
//           className="profile-immg"
//         />
//         <h3 className="profile-naame">Olivia Bennett</h3>
//         <p className="profile-emmail">olivia.bennett@email.com</p>

//         {/* Preferences */}
//         <div className="preferences text-start mt-4">
//           <h5 className="mb-3">Preferences</h5>
//           <label className="form-label">Currency</label>
//           <Dropdown className="currency-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               className="d-flex justify-content-between align-items-center w-100 custom-toggle"
//             >
//               Select Currency
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="w-100 shadow-sm">
//               <Dropdown.Item>USD - US Dollar</Dropdown.Item>
//               <Dropdown.Item>INR - Indian Rupee</Dropdown.Item>
//               <Dropdown.Item>EUR - Euro</Dropdown.Item>
//               <Dropdown.Item>GBP - British Pound</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>

//         {/* Account */}
//         <div className="account text-start mt-4">
//           <h5 className="mb-3">Account</h5>
//           <div className="account-item">
//             <span>Edit Profile</span>
//             <FaEdit />
//           </div>
//           <div className="account-item">
//             <span>Change Password</span>
//             <FaLock />
//           </div>
//         </div>

//         {/* Logout */}
//         <Button className="logout-btn mt-4">Log Out</Button>
//       </Container>
//     </div>
//   );
// }

// export default ProfilePage;
// import React, { useEffect, useMemo, useState } from "react";
// import "../styles/Profile.css";
// import { useNavigate } from 'react-router-dom';
// import { Container, Dropdown, Button } from "react-bootstrap";
// import { FaEdit, FaLock, FaChevronDown, FaCheck } from "react-icons/fa";

// const CURRENCIES = [
//   { code: "USD", name: "US Dollar", symbol: "$" },
//   { code: "EUR", name: "Euro", symbol: "€" },
//   { code: "GBP", name: "British Pound", symbol: "£" },
//   { code: "INR", name: "Indian Rupee", symbol: "₹" },
//   { code: "JPY", name: "Japanese Yen", symbol: "¥" },
// ];

// function ProfilePage() {
//     const navigate = useNavigate();

//   const handleEditProfile = () => {
//     navigate('/editprofile');
//   };

//   const handleChangePassword = () => {
//     navigate('/changepassword');
//   };


//   const [currency, setCurrency] = useState("");

//   // Load saved preference
//   useEffect(() => {
//     const saved = localStorage.getItem("pref_currency");
//     if (saved) setCurrency(saved);
//   }, []);

//   // Persist when it changes
//   useEffect(() => {
//     if (currency) localStorage.setItem("pref_currency", currency);
//   }, [currency]);

//   const current = useMemo(
//     () => CURRENCIES.find((c) => c.code === currency),
//     [currency]
//   );

//   return (
//     <div className="profile-paage">
//       <Container className="profile-container text-center">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
//           alt="avatar"
//           className="profile-immg"
//         />
//         <h3 className="profile-naame">Olivia Bennett</h3>
//         <p className="profile-emmail">olivia.bennett@email.com</p>

//         {/* Preferences */}
//         <div className="preferences text-start mt-4">
//           <h5 className="mb-3">Preferences</h5>
//           <label className="form-label">Currency</label>

//           <Dropdown
//             className="currency-dropdown"
//             onSelect={(eventKey) => setCurrency(eventKey)}
//           >
//             <Dropdown.Toggle className="d-flex justify-content-between align-items-center w-100 custom-toggle">
//               {current ? (
//                 <span>
//                   <strong className="me-2">{current.symbol}</strong>
//                   {current.code} — {current.name}
//                 </span>
//               ) : (
//                 "Select Currency"
//               )}
//               {/* <FaChevronDown className="ms-2" /> */}
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="w-100 shadow-sm">
//               {CURRENCIES.map((c) => (
//                 <Dropdown.Item
//                   key={c.code}
//                   eventKey={c.code}
//                   active={currency === c.code}
//                   className="d-flex justify-content-between align-items-center"
//                 >
//                   <span>
//                     <strong className="me-2">{c.symbol}</strong>
//                     {c.code} — {c.name}
//                   </span>
//                   {currency === c.code && <FaCheck />}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>

//         {/* Account */}
//         <div className="account text-start mt-4">
//           <h5 className="mb-3">Account</h5>
//           <div className="account-item" onClick={handleEditProfile} style={{ cursor: 'pointer' }}>
//             <span>Edit Profile</span>
//             <FaEdit />
//           </div>
//           <div className="account-item" onClick={handleChangePassword} style={{ cursor: 'pointer' }}>
//             <span>Change Password</span>
//             <FaLock />
//           </div>
//         </div>

//         <Button className="logout-btn mt-4">Log Out</Button>
//       </Container>
//     </div>
//   );
// }

// export default ProfilePage;
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';
import { Container, Dropdown, Button } from "react-bootstrap";
import { FaEdit, FaLock, FaCheck } from "react-icons/fa";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
];

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Store logged-in user
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    // Load logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      // If no user, redirect to login
      navigate("/login");
    }

    // Load saved currency preference
    const saved = localStorage.getItem("pref_currency");
    if (saved) setCurrency(saved);
  }, [navigate]);

  // Persist currency preference when changed
  useEffect(() => {
    if (currency) localStorage.setItem("pref_currency", currency);
  }, [currency]);

  const current = useMemo(
    () => CURRENCIES.find((c) => c.code === currency),
    [currency]
  );

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
  };

  const handleLogout = () => {
    // Remove logged-in user info
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="profile-paage">
      <Container className="profile-container text-center">
        <img
          src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
          alt="avatar"
          className="profile-immg"
        />
        <h3 className="profile-naame">{user?.name || "User Name"}</h3>
        <p className="profile-emmail">{user?.email || "user@email.com"}</p>

        {/* Preferences */}
        <div className="preferences text-start mt-4">
          <h5 className="mb-3">Preferences</h5>
          <label className="form-label">Currency</label>

          <Dropdown
            className="currency-dropdown"
            onSelect={(eventKey) => setCurrency(eventKey)}
          >
            <Dropdown.Toggle className="d-flex justify-content-between align-items-center w-100 custom-toggle">
              {current ? (
                <span>
                  <strong className="me-2">{current.symbol}</strong>
                  {current.code} — {current.name}
                </span>
              ) : (
                "Select Currency"
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100 shadow-sm">
              {CURRENCIES.map((c) => (
                <Dropdown.Item
                  key={c.code}
                  eventKey={c.code}
                  active={currency === c.code}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong className="me-2">{c.symbol}</strong>
                    {c.code} — {c.name}
                  </span>
                  {currency === c.code && <FaCheck />}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Account */}
        <div className="account text-start mt-4">
          <h5 className="mb-3">Account</h5>
          <div className="account-item" onClick={handleEditProfile} style={{ cursor: 'pointer' }}>
            <span>Edit Profile</span>
            <FaEdit />
          </div>
          <div className="account-item" onClick={handleChangePassword} style={{ cursor: 'pointer' }}>
            <span>Change Password</span>
            <FaLock />
          </div>
        </div>

        {/* Log Out */}
        <Button className="logout-btn mt-4" onClick={handleLogout}>
          Log Out
        </Button>
      </Container>
    </div>
  );
}

export default ProfilePage;
