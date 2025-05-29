import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"; // reuse same styles

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Creating account:", { email, password });
      // Call signup API here later
    }
  };

  return (
    <div className="login-page">
      <div className="navbar">
        <div className="navbar-left">
          <img src="/src/assets/paw.png" alt="Paw" className="nav-icon" />
          <h1 className="brand-name"> Woofer</h1>
        </div>
        <div className="navbar-right">
<<<<<<< HEAD
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
=======
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
>>>>>>> refs/remotes/origin/main
        </div>
      </div>

      <div className="login-container">
        <h2 className="login-title">Join the Pack</h2>
        <p className="login-subtitle">Create your account below</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="login-button">
            Sign Up
          </button>

          <div className="login-links">
            <Link to="/login" className="signup-link">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
