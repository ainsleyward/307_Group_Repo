//DogProfileModal.jsx

import React from "react";
import "../styles/DogProfileModal.css";

function DogProfileModal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="dogmodal-overlay">
      <div className="dogmodal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default DogProfileModal;
