// src/pages/Form.jsx
// upload to cloudinary using URL from previewURL, then get URL from cloudinary and 
// send that to the 
import React, { useState, useEffect, useRef } from "react";
import { Cloudinary } from '@cloudinary/url-gen';

function CreateDogProfile(props) {
  const [dog, setDog] = useState({
    name: "",
    image: "",
    age: "",
    breed: "",
    bio: ""
  });

  const cld = new Cloudinary({ cloud: { cloudName: 'dbmpxjsz1' } });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const fileInputRef = useRef(null);

  // Trigger upload when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      uploadToCloudinary();
    }
  }, [selectedFile]);

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

  const uploadToCloudinary = async () => {
    // add metadata for Cloudinary API
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'woofer_preset_dogs'); // enforced in non-key'd transactions

    fetch(
      `https://api.cloudinary.com/v1_1/dbmpxjsz1/image/upload`,
      { method: 'POST', body: formData }
    )
    .then((res) => res.json())
    .then((data) => {
      setPublicId(data.public_id);
      setDog(prev => ({ ...prev, image: data.secure_url })); // Update dog.image
      console.log(data);
    })
    .catch((error) => console.error(error))
  }

  function submitForm() {
    props.handleSubmit(dog);
    resetForm();
  }
  
  function resetForm() {
    setDog({ name: "", image: "", age: "", breed: "", bio: "" });

    setSelectedFile(null);
    setPreviewUrl(null);
    setPublicId(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        ref={fileInputRef}
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
