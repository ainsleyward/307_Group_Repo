// src/pages/Swipe.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Swipe.css";
import { useParams } from "react-router-dom";
import domain from "../domain";

console.log(domain);

function Swipe() {
  const { dogId } = useParams();
  const [dogs, setDogs] = useState([]);
  const [tempIndex, setTempIndex] = useState(0);
  const [showCornerPopup, setShowCornerPopup] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${domain}/dogs`).then(res => res.json()),
      fetch(`${domain}/matches?swiperDogId=${dogId}`).then(res => res.json())
    ])
      .then(([allDogs, matches]) => {
        const likedDogIds = new Set();
        for (const match of matches) {
          likedDogIds.add(match.targetDogId);
        }
        const filtered = allDogs.filter(
          (dog) => dog._id !== dogId && !likedDogIds.has(dog._id)
        );
        setDogs(filtered);
      })
      .catch((error) => console.error("Error fetching dogs or matches:", error));
  }, []);


  function next() {
    setTempIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  }

  function handleSubmit(targetDog) {
    fetch(`${domain}/Matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swiperDogId: dogId,
        targetDogId: targetDog._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Match:", data);
        if (data.isMutualMatch) {
          setShowMatchModal(true);
        }
        else {
          setShowCornerPopup(true); 
          setTimeout(() => setShowCornerPopup(false), 3000);
        }
        next();
      })
      .catch((error) => console.error(error));
  }

  const currentDog = dogs[tempIndex];

  if (!dogId) {
    return <p>Error: No swiping dog ID provided.</p>;
  }

  if (dogs.length === 0) {
    return (
      <div className="swipe-container">
        <h1 className="title">Woofer</h1>
        <p>Loading dogs...</p>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <h1 className="title">Woofer</h1>

      {showCornerPopup && (<div className="corner-popup"> Match sent! </div>)}

      {showMatchModal && (
        <div className="match-popup" onClick={() => setShowMatchModal(false)}>
          <div className="match-popup-info">It's a Match!</div>
        </div>
      )}

      <div className="three-columns-grid">
        <div className="button-column">
          <button onClick={next} className="icon-button">
            <svg
              width="176"
              height="175"
              viewBox="0 0 176 175"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="88" cy="87.5" rx="88" ry="87.5" fill="#826997" />
              <path
                d="M122.629 142.369L35.6226 54.1729L56.1566 32.8672L143.024 119.013L122.629 142.369Z"
                fill="white"
              />
              <path
                d="M33.2747 120.947L121.471 33.9407L142.777 54.4748L56.6313 141.342L33.2747 120.947Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div>
          <h2 className="swipe-h2">{currentDog.name}</h2>
          <p>
            <strong>Breed:</strong> {currentDog.breed}
          </p>
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
        <div className="button-column">

          <button
            onClick={() => handleSubmit(currentDog)}
            className="icon-button"
          >
            <svg
              width="175"
              height="175"
              viewBox="0 0 175 175"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="87.5" cy="87.5" r="87.5" fill="#826997" />
              <path
                d="M125.839 103.529C95.5767 73.5426 62.5635 96.7138 45.3691 112.388C37.8036 122.611 51.5591 135.559 63.2513 136.922C74.9434 138.285 78.3823 121.248 85.2601 119.885C92.1378 118.522 98.3278 123.974 109.332 129.426C120.337 134.878 156.101 133.515 125.839 103.529Z"
                fill="white"
              />
              <path
                d="M41.9304 100.803C36.4282 108.299 24.736 91.2617 26.1116 77.6316C28.175 55.8235 48.1203 79.6761 49.4959 85.8097C50.8714 91.9432 47.4326 93.3062 41.9304 100.803Z"
                fill="white"
              />
              <path
                d="M59.1247 72.1797C50.8714 67.8181 52.0177 52.6432 53.6225 45.601C60.5003 30.6079 70.8169 49.0085 75.6313 52.416C80.4458 55.8236 78.3824 63.3201 75.6313 70.1351C72.8802 76.9502 69.4414 77.6316 59.1247 72.1797Z"
                fill="white"
              />
              <path
                d="M90.7624 64.0016C84.5724 55.8235 89.3868 45.601 96.9524 34.0154C113.459 12.2073 112.771 56.505 113.459 59.231C114.147 61.9571 110.708 64.0016 105.893 68.0906C101.079 72.1796 96.9524 72.1796 90.7624 64.0016Z"
                fill="white"
              />
              <path
                d="M135.468 90.5802C129.966 92.6248 121.712 83.7652 118.961 77.6317C116.21 66.7276 146.472 61.9571 147.848 67.4091C149.223 72.8611 140.97 88.5357 135.468 90.5802Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Swipe;

