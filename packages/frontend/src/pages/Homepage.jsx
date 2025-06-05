//Home.jsx
import React, { useEffect } from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

import pawIcon2 from "../assets/paw-icon.png";
import heartIcon from "../assets/heart-icon.png";
import pawIcon from "../assets/paw.png";

function Homepage() {

  // remove session token if it exists
  useEffect(() => {
      localStorage.removeItem("token");
    }, []);

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <nav className="top-bar">
        <div className="brand-left">
          <img src={pawIcon} alt="Paw" className="paw-icon" />
          <h1 className="brand-name">Woofer</h1>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="hero-section">
        <div className="title-wrapper">
          <img src={heartIcon} alt="Heart" className="decor-heart" />
          <h1 className="title">Welcome to Woofer</h1>
          <img src={pawIcon2} alt="Paw" className="decor-paw" />
          <p className="subtitle">
            The #1 social network for pups and their people.
          </p>
          <Link to="/login">
            <button className="get-started-button">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
