import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.access_token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}
