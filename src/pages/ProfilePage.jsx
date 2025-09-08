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
