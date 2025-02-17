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
  const [age, setAge] = useState(user.age);
  const [balance, setBalance] = useState(user.balance);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [isActive, setIsActive] = useState(user.isActive);

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
        placeholder="Enter your name"
      />
      <br />
      User Email: {user.email}
      <br />
      Phone Number:{" "}
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
      />
      <br />
      Age:{" "}
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter your age"
      />
      <br />
      Balance:{" "}
      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        placeholder="Enter your balance"
      />
      <br />
      Birth Date:{" "}
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active User
      </label>
      <br />
      <br />
      <button onClick={handleSaveChanges}>SAVE CHANGES</button>
      <button onClick={handleDeleteProfile}>DELETE PROFILE</button>
    </>
  );
}

function AnonView() {
  return <p>No user was found</p>;
}
