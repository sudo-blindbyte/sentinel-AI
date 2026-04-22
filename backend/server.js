const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const AI_URL = "http://127.0.0.1:5001";

// Home route
app.get("/", (req, res) => {
  res.send("Sentinel Backend Running 🚀");
});

// Check URL
app.post("/check-url", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(`${AI_URL}/analyze-url`, { url });

    res.json({
      risk: response.data.risk,
      reasons: response.data.reasons
    });

  } catch (err) {
    res.status(500).json({ error: "AI not responding" });
  }
});

// Check message
app.post("/check-message", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(`${AI_URL}/analyze-message`, { message });

    res.json({
      risk: response.data.risk,
      reasons: response.data.reasons
    });

  } catch (err) {
    res.status(500).json({ error: "AI not responding" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://127.0.0.1:3000");
});