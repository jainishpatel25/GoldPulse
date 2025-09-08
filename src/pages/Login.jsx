import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No registered user found. Please sign up first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      // Set logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
      // Dispatch custom event for navbar
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-4 text-white">Welcome Back</h2>

      <form className="auth-form w-100" onSubmit={handleLogin}>
        {error && <p className="text-danger mb-2">{error}</p>}
        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input
            type="email"
            className="form-control auth-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control auth-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 text-end">
          <a href="/forgot-password" className="auth-link">Forgot Password?</a>
        </div>

        <button type="submit" className="btn btn-warning w-100 auth-btn">Login</button>
      </form>

      <p className="mt-3 text-white">
        Don’t have an account? <a href="/register" className="auth-link">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
