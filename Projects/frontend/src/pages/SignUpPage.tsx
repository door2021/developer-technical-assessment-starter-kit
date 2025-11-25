import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({ name, email, password });
    navigate("/login");
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Register</h2>

      <input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button type="submit">Register</button>
    </form>
  );
}
