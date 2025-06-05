import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pawIcon from "../assets/paw.png";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        navigate(`/dashboard/${data.userId}`);
      } else {
        const text = await res.text();
        setError(text);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={pawIcon} alt="Paw Icon" className="nav-icon" />
          <span className="brand-name">Woofer</span>
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
      </nav>

      {/* Login Form Area */}
      <div className="login-container">
        <h2 className="login-title">Let’s Get Woofing</h2>
        <p className="login-subtitle">Log in to your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-links">
            <Link to="/signup" className="forgot-link">
              Forgot Password?
            </Link>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
