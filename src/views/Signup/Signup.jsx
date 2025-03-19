import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [balance, setBalance] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSendForm = () => {
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !age ||
      !balance ||
      !birthDate
    ) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(age) || age <= 0) {
      setError("Invalid age.");
      return;
    }

    if (isNaN(balance) || balance < 0) {
      setError("Invalid balance.");
      return;
    }

    setError("");
    const data = {
      name,
      email,
      password,
      phone,
      age: parseInt(age),
      isActive,
      balance: parseFloat(balance),
      birthDate,
      createdAt: Date.now(),
    };

    console.log(data);

    fetch("http://localhost:8080/Java_Web_221_war/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        width: "400px",
        height: "100%",
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter your age"
      />
      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        placeholder="Enter your balance"
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active User
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSendForm}>Register</button>
      <Link to="/">Home</Link>
    </div>
  );
}
