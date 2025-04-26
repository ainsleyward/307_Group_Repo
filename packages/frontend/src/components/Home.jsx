// src/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Form from "./Form";

function Home() {
  const [dogs, setDogs] = useState([]);

  function handleSubmit(dog) {
    fetch("http://localhost:8000/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((newDog) => {
        setDogs((prevDogs) => [...prevDogs, newDog]);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetch("http://localhost:8000/dogs")
      .then((res) => res.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Welcome to Woofer!</h1>
      <p className="subtitle">The #1 Social Network for Pups and their People.</p>
      <button className="home-button">Woof Woof</button>
  
      <div style={{ paddingTop: "2rem" }}>
        <h2>Add Your Dog</h2>
        <Form handleSubmit={handleSubmit} />
  
        <h2>Meet a New Furry Friend:</h2>
        <div className="dog-list">
          {dogs.map((dog, index) => (
            <div key={index} className="dog-card">
              <img src={dog.image} alt={dog.name} className="dog-image" />
              <h3>{dog.name}</h3>
              <p><strong>Breed:</strong> {dog.breed}</p>
              <p>{dog.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Home;


