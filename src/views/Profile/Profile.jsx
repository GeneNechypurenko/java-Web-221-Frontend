import React, { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AppContext);
  return (
    <>
      {user !== null ? <AuthView /> : <AnonView />}
      <br />
      <br />
      <Link to="/">Home</Link>
    </>
  );
}

function AuthView() {
  const { user } = useContext(AppContext);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const handleSaveChanges = () => {
    console.log(user.userId, name, phone);
  };
  const handleDeleteProfile = () => {
    console.log(user.userId, " profile deleted");
  };

  return (
    <>
      User Name:{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      User Email: {user.email}
      <br />
      Phone Number:{" "}
      <input
        type="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <button onClick={handleSaveChanges}>SAVE CHANGES</button>
      <button onClick={handleDeleteProfile}>DELETE PROFILE</button>
    </>
  );
}

function AnonView() {
  return <p>No user was found</p>;
}
