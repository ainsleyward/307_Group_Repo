import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/UserProfile.css";
import Sidebar from "../components/Sidebar";
import domain from "../domain";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${domain}/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [userId]);

  if (!user) {
    return (
      <div className="user-profile-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <Sidebar userId={userId} />

      <div className="user-profile-main">
        {/* Flex container for image and info */}
        <div className="user-profile-content">
          <img src={user.image} alt="Profile" className="user-profile-image" />

          <div className="user-profile-info-card">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>

            {/* Tags */}
            <div className="tags">
              {user.tags && user.tags.length > 0 ? (
                user.tags.map((tag, index) => (
                  <span key={index} className="tag-pill">
                    {tag}
                  </span>
                ))
              ) : (
                <p>No tags added.</p>
              )}
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              <Link to={`/profile/${userId}/edit`}>
                <button className="edit-button">Edit Profile</button>
              </Link>
              <Link to={`/`}>
                <button className="add-dog-button">Add Dog</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
