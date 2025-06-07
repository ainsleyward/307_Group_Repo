// src/pages/App.jsx
import React from "react";
import Home from "./Home";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import Swipe from "./Swipe";
import CreateUserProfile from "./CreateUserProfile";
import Matches from "./Matches";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import DogProfile from "./DogProfile";
import EditDogProfile from "./EditDogProfile";
import UserProfile from "./UserProfile";
import EditUserProfile from "./EditUserProfile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/swipe/:userId" element={<Swipe />} />
        <Route path="/profile/create" element={<CreateUserProfile />} />
        <Route path="/matches/:userId" element={<Matches />} />
        <Route path="/dog/:dogId" element={<DogProfile />} />
        <Route path="/dog/:dogId/edit" element={<EditDogProfile />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/profile/:userId/edit" element={<EditUserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
