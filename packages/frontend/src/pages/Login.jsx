import React from "react";
import { Link } from "react-router-dom";
import pawIcon from "../assets/paw.png";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-page">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={pawIcon} alt="Paw Icon" className="nav-icon" />
          <span className="brand-name">Woofers</span>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>
      </nav>

      {/* Login Form Area */}
      <div className="login-container">
        <h2 className="login-title">Let’s Get Woofing</h2>
        <p className="login-subtitle">Log in to your account</p>
        <form className="login-form">
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
          <div className="login-links">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;