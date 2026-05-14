
import { spamScore } from "../../utils/spamScore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const score = spamScore(message);

  if (score > 5) {
    return res.status(400).json({
      success: false,
      message: "Spam detected ❌ Message blocked"
    });
  }

  // këtu mund të shtosh email service (opsional)

  return res.status(200).json({
    success: true,
    message: "Message sent successfully ✅"
  });
}