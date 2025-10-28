import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const BING_KEY = process.env.BING_KEY || "YOUR_BING_KEY_HERE"; // replace with your Bing API key

app.use(cors());
app.use(express.static("."));

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: { "Ocp-Apim-Subscription-Key": BING_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy browser running on port ${PORT}`));
