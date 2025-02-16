import { Hono } from "hono";
import { z } from "zod";
import Groq from "groq-sdk/index.mjs";
import { cors } from "hono/cors";
import { fal } from "@fal-ai/client";
import { verify } from "jsonwebtoken";
import { jwtVerify } from "jose";
//import { authMiddleware } from "./middleware/auth";

type Bindings = {}; // Add environment variables here if needed
type Variables = { user: any }; // Define "user" as a variable

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Add CORS middleware
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);
const authMiddleware = async (c: any, next: any) => {
  // Retrieve the request from c.req or c.request
  // Retrieve the request from c.req or c.request
  const req = c.req || c.request;
  if (!req) {
    console.error("No request object found on context");
    return c.text("No request", 400);
  }

  // Check if headers is a Headers instance or a plain object
  if (req.headers && typeof req.headers.entries === "function") {
    console.log("Logging headers (Headers instance):");
    for (const [key, value] of req.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
  } else if (req.headers) {
    console.log("Logging headers (plain object):", req.headers);
  } else {
    console.log("No headers found in the request");
  }

  console.log("Before");
  const reqe = c.req || c.request;
  if (!req) {
    console.error("No request object found on context");
    return c.text("Unauthorized", 401);
  }

  // Determine the authorization header based on headers type:
  let authHeader: string | undefined;
  if (req.headers && typeof req.headers.get === "function") {
    // headers is a Headers instance
    authHeader =
      req.headers.get("Authorization") || req.headers.get("authorization");
  } else if (req.headers) {
    // headers is a plain object
    authHeader = req.headers["Authorization"] || req.headers["authorization"];
  }
  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.text("Unauthorized", 401);
  }
  console.log("After");
  console.log("authHeader", authHeader);

  const token = authHeader.split(" ")[1];
  try {
    // Convert your secret into a Uint8Array.
    const secret = new TextEncoder().encode("password_nextauth");
    // jwtVerify returns the decoded payload if the token is valid.
    const { payload } = await jwtVerify(token, secret);
    c.set("user", payload);
    return await next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return c.text("Unauthorized", 401);
  }
};

// Configure Fal API Key
fal.config({
  credentials:
    "7fa1a0e7-a040-4677-a51b-28d53200b942:70a36a0cf752dde88dca58d0bc37aae9",
});

app.get("/", authMiddleware, (c) => {
  return c.json("Hono Found");
});

// **Protected** POST endpoint to generate lyrics
app.post("/generate-lyrics", authMiddleware, async (c) => {
  console.log("Generating lyrics...");
  try {
    const groq = new Groq({
      apiKey: "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",
    });

    const { name, partnerName, memories, feeling } = await c.req.json();

    const prompt = `Create a heartfelt 30 sec love song for my partner, ${partnerName}, to celebrate Valentine's Day. The song should capture our special moments and emotions. Our cherished memories include ${memories}, and my deepest feelings for them are ${feeling}. The lyrics should be romantic, poetic, and touching, with a melody that feels warm and sentimental. Make sure the song flows smoothly, has a gentle rhythm, and conveys deep affection. It should only contain letters and must include the partner's name at the start of the chorus and should have at least 500 characters.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const lyrics = chatCompletion.choices[0]?.message?.content;

    return c.json({ lyrics });
  } catch (error) {
    console.error("Error generating lyrics:", error);
    return c.json({ error: "Failed to generate lyrics" }, 500);
  }
});

// **Protected** POST endpoint to generate a song
app.post("/generate-song", authMiddleware, async (c) => {
  try {
    const { lyrics } = await c.req.json();

    const result = await fal.subscribe("fal-ai/minimax-music", {
      input: {
        prompt: lyrics,
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

    return c.json(result.data);
  } catch (error) {
    console.error("Error generating song:", error);
    return c.json({ error: "Failed to generate song" }, 500);
  }
});

export default app;
