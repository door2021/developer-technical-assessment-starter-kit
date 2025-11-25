import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 20 }}>Home</Link>
      {token ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 20 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
