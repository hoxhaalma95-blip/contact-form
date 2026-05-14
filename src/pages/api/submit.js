import { spamScore } from "../../utils/spamScore";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    console.log("📩 RECEIVED:", req.body);

    // 🔥 spam scoring
    const score = spamScore(message);

    console.log("🧠 SPAM SCORE:", score);

    // 🗄️ insert në Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          name,
          email,
          message,
          score
        }
      ])
      .select();

    // 🚨 log error nëse ka
    if (error) {
      console.log("❌ SUPABASE ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "DB insert failed",
        error: error.message
      });
    }

    console.log("✅ SUPABASE DATA:", data);

    return res.status(200).json({
      success: true,
      message: "Message saved successfully",
      data
    });

  } catch (err) {
    console.log("💥 SERVER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}