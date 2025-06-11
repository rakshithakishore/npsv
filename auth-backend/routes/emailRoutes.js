const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config(); // Just in case you need it

// ✅ Configure transporter using Gmail + App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // from your .env file
    pass: process.env.EMAIL_PASS, // app-specific password
  },
});

// ✅ Route to send break room invitation emails
router.post("/send-breakroom-email", async (req, res) => {
  const { emails, roomCode } = req.body;
  console.log("📩 API Hit! Emails:", emails, "Code:", roomCode);

  if (!emails || !roomCode) {
    return res.status(400).send("Missing emails or roomCode");
  }

  try {
    for (const email of emails) {
      console.log(`Sending to ${email}`);
      await transporter.sendMail({
        from: `"NPS Video Chat" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Break Room Invitation",
        text: `You've been moved to a break room.\n\nJoin using code: ${roomCode}`,
      });
    }

    console.log("✅ All emails sent");
    res.status(200).send("Emails sent");
  } catch (err) {
    console.error("❌ Email send error:", err);
    res.status(500).send("Failed to send email");
  }
});
module.exports = router;

