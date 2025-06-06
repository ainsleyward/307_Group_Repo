// src/pages/Matches.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Swipe.css";
import "../styles/Matches.css";
import { useParams } from "react-router-dom";
import domain from "../domain";
import downIcon from "../assets/down-icon.png";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Matches() {
  const { userId } = useParams();
  console.log("userId from URL:", userId);
  const [allDogs, setAllDogs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchedDogs, setMatchedDogs] = useState([]);
  const [userDogs, setUserDogs] = useState([]);
  const [dogId, setDogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDog, setCurrentDog] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [currChatDog, setCurrChatDog] = useState(null);
  const [currConvoId, setCurrConvoId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${domain}/dogs`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching dogs", error)),

      fetch(`${domain}/matches/all`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching matches:", error)),
    ])
      .then(([allDogs, matchinfo]) => {
        setAllDogs(allDogs);
        console.log("allDogs:", allDogs);
        setMatches(matchinfo);
        console.log("matches:", matchinfo);

        const ownersDogs = allDogs.filter((dog) => dog.owner === userId);
        setUserDogs(ownersDogs);
        console.log("userDogs:", ownersDogs);

        if (ownersDogs.length > 0) {
          setDogId(ownersDogs[0]._id);
          setCurrentDog(ownersDogs[0]);
        } else {
          console.log("This user has no dogs.");
          setLoading(false);
          return;
        }

        const dogsLiked = new Set();
        const likedBy = new Set();
        const tempId = ownersDogs[0]._id;

        for (const match of matches) {
          if (match.swiperDogId === tempId) {
            console.log("+ dogsLiked:", match.targetDogId);
            dogsLiked.add(match.targetDogId);
          }
          if (match.targetDogId === tempId) {
            console.log("+ likedBy:", match.swiperDogId);
            likedBy.add(match.swiperDogId);
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
          (dog) => dog._id !== tempId && mutualSet.has(dog._id),
        );
        setMatchedDogs(filtered);
        setLoading(false);
      })
      .catch((error) => console.error("alternate error:", error));
  }, []);

  useEffect(() => {
    if (!dogId || matches.length === 0 || allDogs.length === 0) return;

    console.log("Changing matches for new dogId:", dogId);

    const dogsLiked = new Set();
    const likedBy = new Set();

    for (const match of matches) {
      if (match.swiperDogId === dogId) {
        dogsLiked.add(match.targetDogId);
      }
      if (match.targetDogId === dogId) {
        likedBy.add(match.swiperDogId);
      }
    }

    console.log("dogsLiked:", dogsLiked);
    console.log("likedBy:", likedBy);

    const mutualMatches = [];

    for (const id of dogsLiked) {
      if (likedBy.has(id)) {
        mutualMatches.push(id);
      }
    }

    const mutualSet = new Set(mutualMatches);
    console.log("mutualSet:", mutualSet);

    const filtered = allDogs.filter(
      (dog) => dog._id !== dogId && mutualSet.has(dog._id),
    );

    console.log("Matched dogs:", filtered);
    setMatchedDogs(filtered);
  }, [dogId, matches, allDogs]);

  useEffect(() => {
    if (!dogId) return;

    fetch(`/api/convos?dogId=${dogId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched conversations:", data);
      })
      .catch((err) => {
        console.error("error getting convos:", err);
      });
  }, [dogId]);

  useEffect(() => {
    if (!currConvoId) return;

    fetch(`${domain}/messages?convoId=${currConvoId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        console.error("error getting messages:", err);
      });
  }, [currConvoId]);

  if (!dogId && !loading) {
    return (
      <div className="swipe-container">
        <h1 className="title">Matches</h1>
        <p>You don’t have any dogs yet!</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="swipe-container">
        <h1 className="title">Matches</h1>
        <p>Loading Matches...</p>
      </div>
    );
  }

  if (allDogs.length === 0) {
    return (
      <div className="swipe-container">
        <h1 className="title">Matches</h1>
        <p>No Matches</p>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Sidebar userId={userId} />

      <div className="matches-container">
        {userDogs.length > 1 && currentDog && (
          <div
            className="dog-switcher"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="chevron">
              <img src={downIcon} alt="⌄" />
            </span>
            <span className="dog-name-label">{currentDog.name}</span>
            <img
              src={currentDog.image}
              alt={currentDog.name}
              className="dog-avatar"
            />

            {showDropdown && (
              <ul className="dog-dropdown">
                {userDogs.map((dog) => (
                  <li
                    key={dog._id}
                    onClick={() => {
                      setDogId(dog._id);
                      setCurrentDog(dog);
                      setShowDropdown(false);
                    }}
                  >
                    {dog.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showChatPopup && currChatDog && (
          <div className="chat-popup">
            <div className="chat-popup-inner">
              <button
                className="close-chat"
                onClick={() => setShowChatPopup(false)}
              >
                ×
              </button>
              <h2 className="chat-header">Chat with {currChatDog.name}</h2>
              <div className="chat-messages">
                {messages.map((msg) => {
                  const sender =
                    msg.participantId === dogId
                      ? currentDog.name
                      : currChatDog.name;
                  return (
                    <div key={msg._id} className="chat-message">
                      <strong>{sender}:</strong> {msg.text}
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await fetch(`${domain}/messages`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        convoId: currConvoId,
                        participantId: dogId,
                        text: newMessage,
                      }),
                    });
                    const saved = await res.json();
                    setMessages((prev) => [...prev, saved]);
                    setNewMessage("");
                  } catch (err) {
                    console.error("sending message failed:", err);
                  }
                }}
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="bark bark bark bark bark..."
                />
                <button type="submit">Woof Woof</button>
              </form>
            </div>
          </div>
        )}

        <h1 className="match-title">
          {currentDog
            ? `Sniff out these matches, ${currentDog.name}!!`
            : "Matches"}
        </h1>
        <div className="match-list">
          {matchedDogs.map((dog) => (
            <div key={dog._id} className="match-card">
              <img
                src={dog.image}
                alt={dog.name}
                className="match-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-dog.png";
                }}
              />

              <div className="match-info">
                <button
                  className="chat-button"
                  onClick={async () => {
                    setCurrChatDog(dog);
                    setShowChatPopup(true);

                    try {
                      const res = await fetch(`${domain}/convos`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          dogId1: dogId,
                          dogId2: dog._id,
                        }),
                      });

                      const data = await res.json();
                      console.log("ConvoID:", data.convoId);
                      setCurrConvoId(data.convoId);
                    } catch (err) {
                      console.error("error with convo:", err);
                    }
                  }}
                >
                  Open Chat
                </button>
                <h2 className="dog-name">{dog.name}</h2>
                <p className="dog-details">
                  {dog.breed}, Age: {dog.age}, Sex: {dog.gender || "N/A"}
                </p>

                <div className="tag-list">
                  {dog.tags &&
                    dog.tags.map((tag, i) => (
                      <span key={i} className="dog-tag">
                        {tag}
                      </span>
                    ))}
                </div>

                <p className="dog-bio">{dog.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matches;
