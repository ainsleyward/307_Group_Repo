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
        const dogsLiked = new Set();
        const likedBy = new Set();
        for (const match of matches) {
            if (dogId === match.swipeDogId) {
                dogsLiked.add(match.targetDogId);
            }
            if (dogId === match.targetDogId) {
                likedBy.add(match.swipeDogId);
            }
        }

        const mutualMatches = []; 
        for (const dog of dogsLiked) {
            if (likedBy.has(dog)) {
                mutualMatches.push(dog);
            }
        }
        const mutualSet = new Set(mutualMatches);

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
        <p>NO MATCHES LOSER</p>
      </div>
    );
  }

  return (
  <div className="matches-container">
    <h1 className="title">Matches</h1>
  </div>);
}

export default Matches;
