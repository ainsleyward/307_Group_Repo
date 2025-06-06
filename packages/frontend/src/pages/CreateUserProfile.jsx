import React, { useState } from "react";
import "../styles/CreateUserProfile.css";

function CreateUserProfile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    city: "",
    tags: [],
    bio: "",
    image: "",
    imgId: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setUser((prevUser) => {
      const alreadySelected = prevUser.tags.includes(value);
      let updatedTags = alreadySelected
        ? prevUser.tags.filter((tag) => tag !== value)
        : [...prevUser.tags, value];

      // Ensure no more than 3 tags
      if (updatedTags.length > 3) return prevUser;
      return { ...prevUser, tags: updatedTags };
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (user.tags.length !== 3) {
      alert("Please select exactly 3 tags.");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", selectedFile);

    try {
      const uploadResponse = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const { imgUrl, publicId } = await uploadResponse.json();

      const fullUser = {
        ...user,
        image: imgUrl,
        imgId: publicId,
      };

      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullUser),
      });

      if (!response.ok) throw new Error("Error saving user");
        const savedUser = await response.json();
        console.log("Saved user!", savedUser);
        window.location.href = `/profile/${savedUser._id}`;


      resetForm();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const resetForm = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      city: "",
      tags: [],
      bio: "",
      image: "",
      imgId: "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <form>
      <div className="name-fields">
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
      />

      <label>Age</label>
      <input
        name="age"
        type="number"
        value={user.age}
        onChange={handleChange}
      />

      <label>Gender</label>
      <select name="gender" value={user.gender} onChange={handleChange}>
        <option value="">Select...</option>
        <option value="F">F</option>
        <option value="M">M</option>
        <option value="Other">Other</option>
      </select>

      <label>City</label>
      <input
        name="city"
        type="text"
        value={user.city}
        onChange={handleChange}
      />

      <label>Tags (Pick 3)</label>
      <div className="tags-group">
        {["Runner", "Hiker", "Bookworm", "Cinephile", "Traveler", "Foodie"].map(
          (tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={user.tags.includes(tag)}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          ),
        )}
      </div>

      <label>Bio</label>
      <textarea name="bio" value={user.bio} onChange={handleChange} />

      <label>Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}

      <button type="button" onClick={submitForm}>
        Submit
      </button>
    </form>
  );
}

export default CreateUserProfile;
