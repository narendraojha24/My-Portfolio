const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: "narendraojha997@gmail.com", // Replace with your email
    pass: "@Dhoni24", // Replace with your email password or app password
  },
});

// API Endpoint for Sending Emails
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "narendraojha997@gmail.com", // Your email to receive messages
    subject: `New Message from ${name}`,
    text: `You have received a new message from your portfolio contact form:
    
Name: ${name}
Email: ${email}
Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Failed to send email.");
    } else {
      res.status(200).send("Email sent successfully!");
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
