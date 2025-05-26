// src/pages/App.jsx
import React from "react";
import Home from "./Home";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import Swipe from "./Swipe";
import Login from "./Login";
import SignUp from "./SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/swipe/:dogId" element={<Swipe />} />
      </Routes>
    </Router>
  );
}

export default App;
