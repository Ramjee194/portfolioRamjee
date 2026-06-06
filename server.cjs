const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

// Bypass local DNS issues with MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = "mongodb+srv://ramjeekumaryadav733_db_user:RIkQtuvWquvbFNZu@cluster0.gm6wqrn.mongodb.net/aktu_platform?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  reply: { type: String, default: "" },
});

const Message = mongoose.model("Message", messageSchema);

// API Endpoints
// 1. Get all messages (sorted by latest)
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// 2. Submit a new message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// 3. Reply to a message (founder dashboard side)
app.post("/api/messages/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({ error: "Reply text is required" });
    }
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to post reply" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
