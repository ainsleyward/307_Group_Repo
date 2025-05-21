//Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
//import Form from "./CreateDogProfile";

function Home() {
  const [dogs, setDogs] = useState([]);
  //const navigate = useNavigate();

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

  // const handleGetStarted = () => {
  //   navigate("./Login"); 
  // };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="logo-row">
          <button className="paw-button">
            <img src="/paw-icon.png" alt="Paw print" className="paw-image" />
          </button>
          <h1 className="brand">Woofer</h1>
        </div>
        <h1 className="title">Welcome to Woofer</h1>
        <p className="subtitle">The #1 social network for pups and their people.</p>
        {/* <button className="get-started-button" onClick={handleGetStarted}>
          Get started
        </button> */}
        <button className="get-started-button"> Get started</button>
        <div className="hero-icons">
          <img src="/paw-icon.png" alt="Paw print" className="paw-icon" />
          <img src="/heart-icon.png" alt="Heart" className="heart-icon" />
        </div>
      </section>
    </div>
  );
  
}

export default Home;