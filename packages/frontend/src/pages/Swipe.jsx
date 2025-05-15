// src/pages/Swipe.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useParams } from "react-router-dom";

function Swipe() {
  const [dogs, setDogs] = useState([]);
  const [tempIndex, setTempIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/dogs")
      .then((res) => res.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error(error));
  }, []);

  function next() {
    setTempIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  }

  const currentDog = dogs[tempIndex];

  return (
    <div className="home-container">
      <h1 className="title">Bark or Bite?</h1>
      <div key={tempIndex} className="dog-card">
              <img src={currentDog.image} alt={currentDog.name} className="dog-image" />
              <h3>{currentDog.name}</h3>
              <p><strong>Breed:</strong> {currentDog.breed}</p>
              <p>{currentDog.bio}</p>
            </div>
    </div>
  );
  
}

export default Swipe;
