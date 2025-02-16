"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/song.routes.ts
const express_1 = require("express");
//import { authMiddleware } from "../middlewares/auth.middleware";
const song_1 = require("../controllers/song");
const router = (0, express_1.Router)();
router.post("/generate-song", song_1.SongController.generateSong);
router.get("/get-song", song_1.SongController.getUserSongs);
exports.default = router;
