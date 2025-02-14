import { Hono } from "hono";
import { z } from "zod";
import Groq from "groq-sdk";
import { cors } from "hono/cors";
import { fal } from "@fal-ai/client";

const app = new Hono();

// Add CORS middleware
app.use(
  "/*", // Apply CORS to all routes
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["POST", "GET", "OPTIONS"], // Allowed HTTP methods
    allowHeaders: ["Content-Type"], // Allowed headers
    maxAge: 86400, // Cache CORS preflight response for 1 day
  })
);

// Configure Fal API Key
fal.config({
  credentials:
    "7fa1a0e7-a040-4677-a51b-28d53200b942:70a36a0cf752dde88dca58d0bc37aae9",
});

app.get("/", (c) => {
  return c.json("Hono Found");
});

// POST endpoint to generate lyrics
app.post("/generate-lyrics", async (c) => {
  try {
    const groq = new Groq({
      apiKey: "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",
    });
    // Parse the request body
    const { name, partnerName, memories, feeling } = await c.req.json();

    // Construct the prompt for OpenAI
    //const prompt = `Write a romantic song with this feeling ${feeling} for ${partnerName} from ${name}. Here are some details: ${memories}`;
    const prompt = `Create a heartfelt 30 sec love song for my partner, ${partnerName}, to celebrate Valentine's Day. The song should capture our special moments and emotions. Our cherished memories include ${memories}, and my deepest feelings for them are ${feeling}. The lyrics should be romantic, poetic, and touching, with a melody that feels warm and sentimental. Make sure the song flows smoothly, has a gentle rhythm, and conveys deep affection. and it should only contain letters and must include partner name at starting corse of song and should have atleast   500 character `;
    // Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    // Extract and parse the response
    const lyrics = chatCompletion.choices[0]?.message?.content;

    // Return the lyrics as JSON
    return c.json({ lyrics });
  } catch (error) {
    console.error("Error generating lyrics:", error);
    return c.json({ error: "Failed to generate lyrics" }, 500);
  }
});

app.post("/generate-song", async (c) => {
  try {
    // Parse the request body
    const { lyrics } = await c.req.json();

    // Construct the prompt for OpenAI
    const prompt = lyrics;

    const result = await fal.subscribe("fal-ai/minimax-music", {
      input: {
        prompt: prompt,
        reference_audio_url:
          "https://fal.media/files/lion/OOTBTSlxKMH_E8H6hoSlb.mpga",
      },
      logs: true,

      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log(result.data);
    console.log(result.requestId);

    // Return the song as JSON
    return c.json(result.data);
  } catch (error) {
    console.error("Error generating song:", error);
    return c.json({ error: "Failed to generate song" }, 500);
  }
});

export default app;
