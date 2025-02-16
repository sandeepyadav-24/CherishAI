import { getGroqClient } from "../config/groq-client";
import { generateLyricsPrompt } from "./prompt-generator";

export const generateLyrics = async (params: {
  partnerName: string;
  memories: string;
  feeling: string;
}) => {
  const groq = getGroqClient();
  const prompt = generateLyricsPrompt(params);

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
  });

  return chatCompletion.choices[0]?.message?.content;
};
