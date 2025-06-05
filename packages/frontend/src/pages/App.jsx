// src/pages/App.jsx
import React from "react";
import Home from "./Home";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import Swipe from "./Swipe";
import CreateUserProfile from "./CreateUserProfile";
import Matches from "./Matches"
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/swipe/:userId" element={<Swipe />} />
        <Route path="/profile/create" element={<CreateUserProfile />} />
        <Route path="/matches/:userId" element={<Matches />} />
      </Routes>
    </Router>
  );
}

export default App;
