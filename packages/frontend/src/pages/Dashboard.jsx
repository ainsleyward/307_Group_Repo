// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import domain from "../domain";
import DogProfileModal from "../components/DogProfileModal";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const dogId = searchParams.get("dogId");
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  error; // to appease the ESLint gods (even with unused vars disabled it crashes :/ )

  useEffect(() => {
    let url = `${domain}/dashboard/${userId}`;
    if (dogId) url += `?dogId=${dogId}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        // unauthoritzed entry
        if (res.status == 401) {
          navigate("/login");
        }

        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched dashboard data:", data);
        setData(data);
      })
      .catch((err) => setError(err.message));
  }, [userId, dogId]);

  if (!data) {
    return (
      <div className="dashboard-container">
        <Sidebar userId={userId} />
        <div className="dashboard-main">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (data.noDogs) {
    return (
      <div className="dashboard-container">
        <Sidebar userId={userId} />
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Welcome back, {data.userName}</h1>
          </div>
          <div className="no-dogs-message">
            <p>No dogs added yet. Have your dog join the pack now!</p>
            <Link to={`/${userId}/dog/create`}>
              <button className="add-dog-button">Add Dog</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { userName, currentDog, matches } = data;

  return (
    <div className="dashboard-container">
      <Sidebar userId={userId} />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, {userName}</h1>
          <svg
            width="76"
            height="71"
            viewBox="0 0 76 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.1555 69.9538C38.1762 69.9889 38.1784 70.0042 38.1613 69.999C38.1487 69.9952 38.1469 69.98 38.1555 69.9538C37.3333 68.5615 7.32702 36.0595 2.71723 23.6177C-2.00856 10.8629 3.30797 1.00684 15.1227 1.00684C26.9373 1.00684 38.5986 22.5331 38.1613 23.6177C37.724 24.7024 49.8464 1.33962 61.7907 1.00684C73.7349 0.674051 77.3056 12.5507 73.6054 23.6177C69.972 34.4849 38.6252 68.5283 38.1555 69.9538Z"
              fill="#5B4970"
            />
            <path
              d="M38.1613 69.999C38.8595 70.21 7.44303 36.3726 2.71723 23.6177C-2.00856 10.8629 3.30797 1.00684 15.1227 1.00684C26.9373 1.00684 38.5986 22.5331 38.1613 23.6177C37.724 24.7024 49.8464 1.33962 61.7907 1.00684C73.7349 0.674051 77.3056 12.5507 73.6054 23.6177C69.9051 34.6848 37.463 69.788 38.1613 69.999Z"
              stroke="#5B4970"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="dashboard-subheader">
          <h2>Pawfect pups for {currentDog.name}</h2>
          <div className="dog-dropdown">
            <svg
              className="dropdown-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="dog-name">{currentDog.name}</span>
            <img
              src={currentDog.image}
              alt={currentDog.name}
              className="dog-profile-pic"
            />
          </div>
        </div>

        <div className="standout-dogs">
          {matches.map((match) => (
            <div key={match._id} className="match-card">
              <div className="image-wrapper">
                <img
                  src={match.image}
                  alt={match.name}
                  className="match-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-dog.png";
                  }}
                />
                <button
                  className="view-profile"
                  onClick={() => {
                    setSelectedDog(match);
                    setShowModal(true);
                  }}
                >
                  View profile
                </button>
              </div>

              <div className="match-info">
                <div className="tags">
                  {match.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{match.name}</h3>
                <p className="breed">{match.breed}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-banner">
          <div className="banner-text">
            <p>
              Let’s find
              <br />
              {currentDog.name}’s new bestie.
            </p>
          </div>
          <div className="banner-image-container">
            <img
              src="../src/assets/dashboard-image.jpeg"
              alt="Dog group"
              className="cta-image"
            />
            <button className="cta-button">Let's go!</button>
          </div>
        </div>
      </div>

      <DogProfileModal show={showModal} onClose={() => setShowModal(false)}>
        {selectedDog && (
          <div className="modal-body">
            <img
              src={selectedDog.image}
              alt={selectedDog.name}
              className="modal-dog-img"
            />
            <div className="modal-dog-details">
              <h2 className="dog-name-heading">{selectedDog.name}</h2>
              <p>{selectedDog.breed}</p>
              <div className="modal-tags">
                {selectedDog.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="modal-bio">{selectedDog.bio}</p>
            </div>
          </div>
        )}
      </DogProfileModal>
    </div>
  );
}

export default Dashboard;
