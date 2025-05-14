// src/App.jsx
import React from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Swipe from "./Swipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/swipe" element={<Swipe />} />
      </Routes>
    </Router>
  );
}

export default App;

