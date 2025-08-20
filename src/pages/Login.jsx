import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css"; // custom styles

function Login() {
  return (
    <div className="auth-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-4 text-white">Welcome Back</h2>

      <form className="auth-form w-100">
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
        <div className="mb-2">
          <label className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control auth-input"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-3 text-end">
          <a href="/forgot-password" className="auth-link">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-warning w-100 auth-btn">
          Login
        </button>
      </form>

      <p className="mt-3 text-white">
        Don’t have an account?{" "}
        <a href="/register" className="auth-link">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
