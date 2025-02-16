"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongController = void 0;
const song_services_1 = require("../services/song-services");
exports.SongController = {
    generateSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lyrics } = req.body;
            //const userId = req.user.sub;
            // Deduct 1 credit
            //await UserService.deductCredits(userId, 1);
            // Generate song
            const songData = yield song_services_1.SongService.generateSong(lyrics);
            // Save song and lyrics
            //const savedSong = await SongService.saveSong(
            // userId,
            // lyrics,
            // songData.audioUrl
            //);
            //res.json(savedSong);
            console.log(songData);
            res.json(songData);
        });
    },
    getUserSongs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const userId = req.user.sub;
            //const songs = await SongService.getUserSongs(userId);
            //res.json(songs);
        });
    },
};
