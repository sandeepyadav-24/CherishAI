// src/routes/song.routes.ts
import { Router } from "express";
//import { authMiddleware } from "../middlewares/auth.middleware";
import { SongController } from "../controllers/song";

const router = Router();

router.post("/generate-song", SongController.generateSong);
router.get("/get-song", SongController.getUserSongs);

export default router;
