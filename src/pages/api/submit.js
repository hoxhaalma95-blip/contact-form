import { spamScore } from "../../utils/spamScore";
import { supabase } from "../../lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // ✔ vetëm POST lejohet
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // ✔ spam check
  const score = spamScore(message);

  if (score > 5) {
    return res.status(400).json({
      success: false,
      message: "Spam detected ❌"
    });
  }

  try {
    // ✔ ruaj në database
    await supabase.from("messages").insert([
      {
        name,
        email,
        message,
        score
      }
    ]);

    // ✔ dërgo email
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "hoxhaalma95@gmail.com", // 
      subject: "New Contact Form Message",
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Spam Score:</b> ${score}</p>
      `
    });

   
    return res.status(200).json({
      success: true,
      message: "Message sent successfully ✅"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong ❌"
    });
  }
}