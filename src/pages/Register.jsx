import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";
 import axios from "axios";


function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  if (!name || !email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    // Optionally auto-login after registration
    // const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
    //   email,
    //   password,
    // });
    // localStorage.setItem("token", loginRes.data.token);

    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="auth-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-4 text-white">Create your account</h2>

      <form className="auth-form w-100" onSubmit={handleRegister}>
        {/* Display error if any */}
        {error && <p className="text-danger mb-2">{error}</p>}

        {/* Name */}
        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input
            type="text"
            className="form-control auth-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="mb-3">
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

        {/* Sign Up Button */}
        <button type="submit" className="btn btn-warning w-100 auth-btn">
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-white">
        Already have an account?{" "}
        <a href="/login" className="auth-link">
          Sign in
        </a>
      </p>
    </div>
  );
}

export default Register;
