import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [emails, setEmails] = useState([""]);
  const [login, setLogin] = useState("");
  const [city, setCity] = useState("");
  const [phones, setPhones] = useState([""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleAddEmail = () => setEmails([...emails, ""]);
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddPhone = () => setPhones([...phones, ""]);
  const handlePhoneChange = (index, value) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const handleSendForm = () => {
    if (
      !name ||
      emails.some((email) => !email) ||
      !login ||
      !city ||
      phones.some((phone) => !phone) ||
      !password ||
      !confirmPassword ||
      !birthDate
    ) {
      setError("All fields are required.");
      return;
    }

    if (emails.some((email) => !emailRegex.test(email))) {
      setError("One or more emails are invalid.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain letters and numbers."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    const data = { name, emails, login, city, phones, password, birthDate };

    fetch("http://localhost:8080/Java_Web_221_war/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(console.log);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "400px",
        position: "relative",
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Enter your login"
      />
      {emails.map((email, index) => (
        <input
          key={index}
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(index, e.target.value)}
          placeholder="Enter your email"
        />
      ))}
      <button onClick={handleAddEmail}>Add Email</button>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter your city"
      />
      {phones.map((phone, index) => (
        <input
          key={index}
          type="text"
          value={phone}
          onChange={(e) => handlePhoneChange(index, e.target.value)}
          placeholder="Enter your phone number"
        />
      ))}
      <button onClick={handleAddPhone}>Add Phone</button>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
      />
      {error && (
        <p style={{ color: "red", position: "absolute", top: "100%" }}>
          {error}
        </p>
      )}
      <button onClick={handleSendForm}>Register</button>
    </div>
  );
}

export default App;
