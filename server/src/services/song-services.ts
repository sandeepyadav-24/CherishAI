// src/services/song.service.ts
import prisma from "../config/prisma-client";
import { fal } from "@fal-ai/client";

export const SongService = {
  async generateSong(lyrics: string) {
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

    return result.data;
  },

  async saveSong(userId: string, lyrics: string, audioUrl?: string) {
    return prisma.song.create({
      data: {
        userId,
        lyrics,
        audioUrl,
      },
    });
  },

  async getUserSongs(userId: string) {
    return prisma.song.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
