import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./views/Signup/Signup";
import Home from "./views/Home/Home";
import Signin from "./views/Signin/Signin";
import AppContext from "./AppContext";
import Profile from "./views/Profile/Profile";
import Admin from "./views/Admin/Admin";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const request = (url, conf) =>
    new Promise((resolve, reject) => {
      if (
        // accessToken != null
        accessToken != null &&
        typeof accessToken.accessTokenId !== "undefined"
      ) {
        if (!conf) {
          conf = {};
        }
        if (!conf.headers) {
          conf.headers = {};
        }
        if (!conf.headers.Authorization) {
          // conf.headers.Authorization = "Bearer " + accessToken;
          conf.headers.Authorization = "Bearer " + accessToken.accessTokenId;
        }
      }
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

  return (
    <AppContext.Provider
      value={{ user, setUser, request, accessToken, setAccessToken }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
