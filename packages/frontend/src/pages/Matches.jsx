// src/pages/Matches.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Swipe.css";
import "../styles/Matches.css";
import { useParams } from "react-router-dom";
import domain from "../domain";

console.log(domain);

function Matches() {
  const { dogId } = useParams();
  console.log("dogId from URL:", dogId);
  const [dogs, setDogs] = useState([]);
  console.log("dogs:", dogs);
  const [loading, setLoading] = useState(true);
  const [currentDog, setCurrentDog] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${domain}/dogs`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching dogs", error)),

      fetch(`${domain}/matches/all`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching matches:", error)),
    ])
      .then(([allDogs, matches]) => {
        console.log("matches:", matches);
        const dogsLiked = new Set();
        const likedBy = new Set();

        const mainDog = allDogs.find((dog) => dog._id === dogId);
        setCurrentDog(mainDog);

        for (const match of matches) {
            console.log("s:", match.swiperDogId);
            console.log("t:", match.targetDogId);
            console.log("d:", dogId);
            if (match.swiperDogId === dogId) {
              console.log("+ dogsLiked:", match.targetDogId);
              dogsLiked.add(match.targetDogId)
            }
            if (match.targetDogId === dogId) {
              console.log("+ likedBy:", match.swiperDogId);
              likedBy.add(match.swiperDogId)
            }
        }
        console.log("dogsLiked:", dogsLiked);
        console.log("likedby:", likedBy);

        const mutualMatches = []; 
        for (const dog of dogsLiked) {
            if (likedBy.has(dog)) {
                mutualMatches.push(dog);
            }
        }
        const mutualSet = new Set(mutualMatches);
        console.log("set:", mutualSet);

        const filtered = allDogs.filter(
          (dog) => dog._id !== dogId && mutualSet.has(dog._id),
        );
        setDogs(filtered);
        setLoading(false);
      })
      .catch((error) => console.error("alternate error:", error));
  }, []);

  if (!dogId) {
    return <p>Error: No swiping dog ID provided.</p>;
  }
  if (loading) {
    return (
    <div className="swipe-container">
      <h1 className="title">Matches</h1>
      <p>Loading Matches...</p>
    </div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div className="swipe-container">
        <h1 className="title">Matches</h1>
        <p>No Matches</p>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <h1 className="title">{currentDog ? `Sniff out these matches, ${currentDog.name}!!` : "Matches"}</h1>
      <div className="match-list">
        {dogs.map((dog) => (
          <div className="match-card">
            <img src={dog.image} alt={dog.name} className="match-image" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-dog.png";
              }}
            />

            <div className="match-info">
              <h2 className="dog-name">{dog.name}</h2>
              <p className="dog-details">
                {dog.breed}, Age: {dog.age}, Sex: {dog.gender || "N/A"}
              </p>

              <div className="tag-list">
                {dog.tags && dog.tags.map((tag, i) => (
                  <span key={i} className="dog-tag">{tag}</span>
                ))}
              </div>

              <p className="dog-bio">{dog.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
