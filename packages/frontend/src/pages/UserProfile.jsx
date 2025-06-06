import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/UserProfile.css"; 

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [userId]);

  if (!user) {
    return <div className="user-profile-container"><p>Loading...</p></div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <img src={user.image} alt="Profile" className="user-profile-image" />
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <Link to={`/profile/${userId}/edit`}>
          <button>Edit Profile</button>
        </Link>
        <Link to={`/dog/create`}>
          <button>Add Dog</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
