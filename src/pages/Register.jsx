import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";

function Register() {
  return (
    <div className="auth-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-4 text-white">Create your account</h2>

      <form className="auth-form w-100">
        {/* Name */}
        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input
            type="text"
            className="form-control auth-input"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input
            type="email"
            className="form-control auth-input"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control auth-input"
            placeholder="Enter your password"
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
