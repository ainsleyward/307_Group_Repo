import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditForms.css";
import domain from "../domain";

function EditUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${domain}/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${domain}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update user");

      alert("Profile updated successfully!");
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input name="lastName" value={user.lastName} onChange={handleChange} />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />

        <label>City</label>
        <input name="city" value={user.city} onChange={handleChange} />

        <label>Bio</label>
        <textarea name="bio" value={user.bio} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserProfile;
