// src/controllers/song.controller.ts
import { Request, Response } from "express";
import { SongService } from "../services/song-services";
import { UserService } from "../services/user-services";

// Define a custom type that includes `user`
interface AuthenticatedRequest extends Request {
  user?: { sub: string }; // Ensure TypeScript knows user has `sub`
}

export const SongController = {
  async generateSong(req: Request, res: Response) {
    const { lyrics } = req.body;
    //const userId = req.user.sub;

    // Deduct 1 credit
    //await UserService.deductCredits(userId, 1);

    // Generate song
    const songData = await SongService.generateSong(lyrics);

    // Save song and lyrics
    //const savedSong = await SongService.saveSong(
    // userId,
    // lyrics,
    // songData.audioUrl
    //);

    //res.json(savedSong);
    console.log(songData);
    res.json(songData);
  },

  async getUserSongs(req: Request, res: Response) {
    //const userId = req.user.sub;
    //const songs = await SongService.getUserSongs(userId);
    //res.json(songs);
  },
};
