import React, { useEffect, useMemo, useState } from "react";
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';
import { Container, Dropdown, Button } from "react-bootstrap";
import { FaEdit, FaLock, FaCheck ,FaPhone } from "react-icons/fa";

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
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // keep local copy fresh
      } else {
        console.error("Failed to load profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();

  // Load currency preference
  const saved = localStorage.getItem("pref_currency");
  if (saved) setCurrency(saved);
}, [navigate]);

const handleCurrencyChange = async (newCurrency) => {
  setCurrency(newCurrency); // immediate UI update
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferredCurrency: newCurrency }),
    });

    const data = await res.json();

    if (res.ok) {
      // Update local user info
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("pref_currency", newCurrency);
      console.log("✅ Currency updated successfully!");
    } else {
      console.error("❌ Failed to update currency:", data.message);
    }
  } catch (error) {
    console.error("⚠️ Error updating currency:", error);
  }
};

  // Persist currency preference when changed
  // useEffect(() => {
  //   if (currency) localStorage.setItem("pref_currency", currency);
  // }, [currency]);

  const current = useMemo(
    () => CURRENCIES.find((c) => c.code === currency),
    [currency]
  );

  const handleEditProfile = () => {
    navigate('/editprofile' , {state :{user}});
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
  };

  const handleLogout = () => {
    // Remove logged-in user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("logout"));

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
        {user?.phone && (
          <p className="profile-phone">
            <FaPhone className="me-2 text-muted" />
            {user?.phone}
          </p>
        )}
        {/* Preferences */}
        <div className="preferences text-start mt-4">
          <h5 className="mb-3">Preferences</h5>
          <label className="form-label">Currency</label>

          <Dropdown
            className="currency-dropdown"
            onSelect={(eventKey) => handleCurrencyChange(eventKey)}
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
