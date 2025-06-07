// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Form from "./CreateDogProfile";
import domain from "../domain";

function Home() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${domain}/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  function handleSubmit(dog) {
    console.log(dog);
    dog.owner = userId;
    fetch(`${domain}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((dog) => {
        // reflect the new dog's id on the user's dogs array
        user.dogs = [...user.dogs, dog._id];

        // change user
        fetch(`${domain}/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then(navigate(`/profile/${dog.owner}`))
          .catch((error) => {
            // erase dog if user could not be changed :c (would be work for the future if we had more time)
            throw error;
          });
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="home-container">
      <div style={{ paddingTop: "2rem" }}>
        <h2>Add Your Dog</h2>
        <Form handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Home;
