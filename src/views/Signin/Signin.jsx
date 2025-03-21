import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, request, setAccessToken, setCart, setCartItems } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleSendForm = () => {
    // rfc7617 authentication standart
    let data = login + ":" + password;
    let credentials = btoa(data);

    request("/user", {
      method: "GET",
      headers: {
        Authorization: "Basic " + credentials,
      },
    })
      .then((data) => {
        setUser(data.user);
        setCart(data.cart);
        setCartItems(data.cartItems);
        setAccessToken(data.accessToken);
        // setAccessToken(data.jwtToken);
        navigate("/profile");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        width: "400px",
        height: "100%",
      }}
    >
      <input
        type="email"
        placeholder="Enter your login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleSendForm}>
        Sign In
      </button>
      <br />
      <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
}
