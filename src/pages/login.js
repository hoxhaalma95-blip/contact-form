import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "hoxhaalma95@gmail.com" && password === "123456") {
      localStorage.setItem("auth", "true");
      router.push("/admin");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6"
    }}>
      <form onSubmit={handleLogin} style={{
        padding: 30,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: 300
      }}>
        <h2 style={{ marginBottom: 20 }}>Admin Login 🔐</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button style={{
          width: "100%",
          padding: 10,
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}>
          Login
        </button>
      </form>
    </div>
  );
}