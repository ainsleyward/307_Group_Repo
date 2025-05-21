// src/pages/Form.jsx
// upload to cloudinary using URL from previewURL, then get URL from cloudinary and 
// send that to the 
import React, { useState, useEffect, useRef } from "react";

function CreateDogProfile(props) {
  const [dog, setDog] = useState({
    name: "",
    image: "",
    imgId: "",
    age: "",
    breed: "",
    bio: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  //const fileInputRef = useRef(null);


  function handleChange(event) {
    const { name, value } = event.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value
    }));
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if(!file)
    {
      console.log("No file selected");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const submitForm = async (e) => {
    e.preventDefault();

  const uploadFormData = new FormData();
  uploadFormData.append('image', selectedFile);

  try {
    const uploadResponse = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: uploadFormData
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.error);
    }

    const { imgUrl, publicId } = await uploadResponse.json();

    dog.image = imgUrl;
    dog.imgId = publicId;

    setDog(dog);
    props.handleSubmit(dog);
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
}
  
  function resetForm() {
    setDog({ name: "", image: "", imgId: "", age: "", breed: "", bio: "" });

    setSelectedFile(null);
    setPreviewUrl(null);
  }


  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={dog.name}
        onChange={handleChange}
      />

      <label htmlFor="image">Image</label>
      <input
        type="file" 
        accept="image/*"
        id="image"
        onChange={handleFileSelect}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: '200px', margin: '10px 0' }}
        />
      )}

      <label htmlFor="age">Age</label>
      <input
        type="number"
        name="age"
        id="age"
        value={dog.age}
        onChange={handleChange}
      />

      <label htmlFor="breed">Breed</label>
      <input
        type="text"
        name="breed"
        id="breed"
        value={dog.breed}
        onChange={handleChange}
      />

      <label htmlFor="bio">Bio</label>
      <input
        type="text"
        name="bio"
        id="bio"
        value={dog.bio}
        onChange={handleChange}
      />

      <input
        type="button"
        value="Submit"
        onClick={submitForm}
      />
    </form>
  );
}

export default CreateDogProfile;
