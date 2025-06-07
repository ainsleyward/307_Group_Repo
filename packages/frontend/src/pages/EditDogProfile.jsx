import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import domain from "../domain";

function EditDogProfile() {
  const { dogId } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    fetch(`${domain}/dogs/${dogId}`)
      .then((res) => res.json())
      .then(setDog)
      .catch(console.error);
  }, [dogId]);

  if (!dog) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDog((prevDog) => ({ ...prevDog, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", selectedFile);

        const uploadResponse = await fetch(`${domain}/upload`, {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) throw new Error("Image upload failed");

        const { imgUrl, publicId } = await uploadResponse.json();
        dog.image = imgUrl;
        dog.imgId = publicId;
      }

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
      <h2>Edit Dog Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={dog.name} onChange={handleChange} />

        <label>Breed</label>
        <input name="breed" value={dog.breed} onChange={handleChange} />

        <label>Age</label>
        <input
          name="age"
          type="number"
          value={dog.age}
          onChange={handleChange}
        />

        <label>Bio</label>
        <textarea name="bio" value={dog.bio} onChange={handleChange} />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditDogProfile;
