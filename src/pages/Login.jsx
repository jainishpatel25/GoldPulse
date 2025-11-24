import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";
 import axios from "axios";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    const {token,user } = res.data;

    // ✅ Store token securely
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Optional: store user info if returned
    // localStorage.setItem("user", JSON.stringify(res.data.user));

    // Notify navbar and redirect
    window.dispatchEvent(new Event("login"));
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
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
