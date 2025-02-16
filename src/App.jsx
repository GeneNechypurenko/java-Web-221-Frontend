import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./views/Signup/Signup";
import Home from "./views/Home/Home";
import Signin from "./views/Signin/Signin";
import AppContext from "./AppContext";
import Profile from "./views/Profile/Profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser, request }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

const request = (url, conf) =>
  new Promise((resolve, reject) => {
    const endpoint = "http://localhost:8080/Java_Web_221_war";
    fetch(endpoint + url, conf)
      .then((r) => r.json())
      .then((j) => {
        if (j.status < 300) {
          resolve(j.data);
        } else {
          reject(j);
        }
      })
      .catch((e) => reject(e));
  });

export default App;
