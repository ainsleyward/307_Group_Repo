// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [dog, setDog] = useState({
    name: "",
    image: "",
    age: "",
    breed: "",
    bio: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value
    }));
  }

  function submitForm() {
    props.handleSubmit(dog);
    setDog({ name: "", image: "", age: "", breed: "", bio: "" });
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
        type="text"
        name="image"
        id="image"
        value={dog.image}
        onChange={handleChange}
      />

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

export default Form;
