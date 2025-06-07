import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditForms.css";
import domain from "../domain";

function EditUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const uploadResponse = await fetch(`${domain}/upload`, {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const err = await uploadResponse.json();
        throw new Error(err.error || "Image upload failed");
      }

      const { imgUrl, publicId } = await uploadResponse.json();

      setUser((prevUser) => ({
        ...prevUser,
        image: imgUrl,
        imgId: publicId, // store if needed later
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
    }
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

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserProfile;
