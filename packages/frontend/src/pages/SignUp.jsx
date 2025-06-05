import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      try {
        const res = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("token", data.token);
          navigate(`/dashboard/${data.userId}`);
        }
        
        else {
          const text = await res.text();
          setErrors({ api: text });
        }
      } catch (err) {
        setErrors({ api: "Network error. Please try again." });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="navbar">
        <div className="navbar-left">
          <img src="/src/assets/paw.png" alt="Paw" className="nav-icon" />
          <h1 className="brand-name">Woofer</h1>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>
      </div>

      <div className="login-container">
        <h2 className="login-title">Join the Pack</h2>
        <p className="login-subtitle">Create your account below</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="login-input" />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}

          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="login-input" />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="login-input" />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="login-input" />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="login-input" />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button type="submit" className="login-button">Sign Up</button>

          {errors.api && <p className="error-text">{errors.api}</p>}

          <div className="login-links">
            <Link to="/login" className="signup-link">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
