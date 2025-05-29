// src/pages/Form.jsx
// upload to cloudinary using URL from previewURL, then get URL from cloudinary and
// send that to the
import React, { useState } from "react";
import domain from "../domain";

function CreateDogProfile(props) {
  const [dog, setDog] = useState({
    name: "",
    image: "",
    imgId: null,
    age: "",
    breed: "",
    bio: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  let selectedFile = null;

  function handleChange(event) {
    const { name, value } = event.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    // discard previous picture
    if (dog.imgId != null) {
      fetch(`${domain}/upload/${encodeURIComponent(dog.imgId)}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 204) {
            console.log("Image deleted successfully!");
          } else {
            throw new Error("");
          }
        })
        .catch((error) => console.log(error));

      dog.imgId = null;
      dog.image = null;
    }

    selectedFile = file;
    setPreviewUrl(URL.createObjectURL(file));

    const uploadFormData = new FormData();
    uploadFormData.append("image", selectedFile);

    // upload new picture
    try {
      const uploadResponse = await fetch(`${domain}/upload`, {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error);
      }

      const { imgUrl, publicId } = await uploadResponse.json();

      // update dog
      dog.image = imgUrl;
      dog.imgId = publicId;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function submitForm() {
    setDog(dog);
    props.handleSubmit(dog);
    resetForm();
  }

  function resetForm() {
    setDog({ name: "", image: "", imgId: "", age: "", breed: "", bio: "" });
    selectedFile = null;
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

      {/* May wanna move into CSS file */}
      <label
        htmlFor="image"
        style={{
          display: "inline-block",
          padding: "5px 10px",
          backgroundColor: "#7700ff",
          color: "#fff",
          fontSize: "12px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        Choose Image
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: "150px", margin: "10px 0", padding: "10px 10px" }}
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

      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default CreateDogProfile;
