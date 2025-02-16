import dotenv from "dotenv";
import { Router } from "express";
import { generateLyrics } from "../services/lyrics-generator";
const router = Router();
dotenv.config();

router.post("/generate", async (req, res) => {
  try {
    const { name, partnerName, memories, feeling } = req.body;
    const lyrics = await generateLyrics({ partnerName, memories, feeling });
    res.json({ lyrics });
  } catch (error) {
    console.error("Error generating lyrics:", error);
    res.status(500).json({ error: "Failed to generate lyrics" });
  }
});

export const lyricsRouter = router;
