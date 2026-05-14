import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        fontFamily: "Arial",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: 40, marginBottom: 10 }}>
        Contact Form 🚀
      </h1>

      <p style={{ color: "gray", marginBottom: 30 }}>
        Serverless + Supabase + Spam Detection
      </p>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: 15 }}>

        <Link href="/login">
          <button
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Login 🔐
          </button>
        </Link>

        <Link href="/admin">
          <button
            style={{
              padding: "10px 20px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Admin 📊
          </button>
        </Link>

      </div>
    </div>
  );
}