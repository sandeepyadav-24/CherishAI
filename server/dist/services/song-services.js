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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
// src/services/song.service.ts
const prisma_client_1 = __importDefault(require("../config/prisma-client"));
const client_1 = require("@fal-ai/client");
exports.SongService = {
    generateSong(lyrics) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.fal.subscribe("fal-ai/minimax-music", {
                input: {
                    prompt: lyrics,
                    reference_audio_url: "https://fal.media/files/lion/OOTBTSlxKMH_E8H6hoSlb.mpga",
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                },
            });
            return result.data;
        });
    },
    saveSong(userId, lyrics, audioUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.default.song.create({
                data: {
                    userId,
                    lyrics,
                    audioUrl,
                },
            });
        });
    },
    getUserSongs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.default.song.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });
        });
    },
};
