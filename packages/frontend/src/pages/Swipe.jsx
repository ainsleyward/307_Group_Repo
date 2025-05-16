// src/pages/Swipe.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Swipe.css";
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

  if (dogs.length === 0) {
    return (
      <div className="swipe-container">
        <h1 className="title">Bark or Bite?</h1>
        <p>Loading dogs...</p>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <h1 className="title">Bark or Bite?</h1>

      <div class="three-columns-grid">
        <div><button onClick={next} className="swipe-button">NO!!</button></div>
        <div>
          <h2 className="swipe-h2">{currentDog.name}</h2>
          <p><strong>Breed:</strong> {currentDog.breed}</p>
          <img
          src={currentDog.image}
          alt={currentDog.name}
          className="swipe-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-dog.png";
          }}
          />
          <p>{currentDog.bio}</p>
        </div>
        <div><button onClick={next} className="swipe-button">SURE!!</button></div>
      </div>

      
    </div>
  );
  
}

export default Swipe;
