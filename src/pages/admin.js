import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 protect route (login check)
  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      router.push("/login");
    }
  }, []);

  // 📡 fetch messages
  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: 30 }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Admin Dashboard 📊</h1>
          <p style={{ color: "gray" }}>Manage contact messages</p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            router.push("/login");
          }}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div style={{ display: "grid", gap: 15 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                background: "white",
                padding: 15,
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ marginBottom: 5 }}>{m.name}</h3>

              <p style={{ margin: 0, color: "gray" }}>
                📧 {m.email}
              </p>

              <p style={{ marginTop: 10 }}>
                💬 {m.message}
              </p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "4px 8px",
                  borderRadius: 5,
                  background: m.score > 5 ? "#fee2e2" : "#dcfce7",
                  color: m.score > 5 ? "red" : "green",
                  fontSize: 12
                }}
              >
                Spam Score: {m.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}