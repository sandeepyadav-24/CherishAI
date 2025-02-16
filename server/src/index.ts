import express from "express";
import { lyricsRouter } from "./routes/lyrics";
import songRouter from "./routes/song-routes";
import { configureFalClient } from "./config/configure-fal-client";
import prisma from "./config/prisma-client";
const app = express();
const port = 3002;

// GLobal Middleware
app.use(express.json());

// Configure FAL client
configureFalClient();

app.use("/api/v1/lyrics", lyricsRouter);
app.use("/api/v1/song", songRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Connect to Prisma
prisma.$connect().then(() => {
  console.log("Connected to PostgreSQL via Prisma");
});
