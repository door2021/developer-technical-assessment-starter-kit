import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { register, selectAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(register(form)).then((res) => {
      if ((res as any).meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="pt-28 max-w-md mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      {auth.error && <p className="text-red-500 mb-4">{auth.error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border rounded-md p-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-md p-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-md p-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {auth.loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
