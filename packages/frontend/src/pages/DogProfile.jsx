import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/DogProfile.css";
import Sidebar from "../components/Sidebar";
import domain from "../domain";

function DogProfile() {
  const { dogId } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch(`${domain}/dogs/${dogId}`)
      .then(res => res.json())
      .then(setDog)
      .catch(console.error);
  }, [dogId]);

  if (!dog) return <p>Loading...</p>;

  return (
    <div className="dog-profile-container">
      <Sidebar userId={userId} />
      <div className="dog-profile-card">
        <img src={dog.image} alt={dog.name} className="dog-profile-image" />
        <h2>{dog.name}</h2>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age}</p>
        <p><strong>Bio:</strong> {dog.bio}</p>
        <Link to={`/dog/${dogId}/edit`}>
          <button>Edit Dog</button>
        </Link>
      </div>
    </div>
  );
}

export default DogProfile;
