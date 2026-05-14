import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("❌ Failed to send message");
      }
    } catch (error) {
      setStatus("❌ Error sending message");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: 350,
        }}
      >
        <h1 style={{ marginBottom: 20 }}>Contact Form 📩</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...inputStyle, height: 100 }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p style={{ marginTop: 15, color: "#333" }}>{status}</p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};