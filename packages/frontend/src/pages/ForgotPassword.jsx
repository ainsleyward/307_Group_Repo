import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // fake backend call here later
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="login-page">
      <div className="navbar">
        <div className="navbar-left">
          <img src="/src/assets/paw.png" alt="Paw" className="nav-icon" />
          <h1 className="brand-name">woofers</h1>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </div>
      </div>

      <div className="login-container">
        <h2 className="login-title">Forgot Password</h2>
        <p className="login-subtitle">
          Enter your email to receive reset instructions
        </p>
        {!submitted ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="login-button">
              Send Reset Link
            </button>
            <div className="login-links">
              <Link to="/login" className="signup-link">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <p className="success-text">✅ Reset link sent! Check your inbox.</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
