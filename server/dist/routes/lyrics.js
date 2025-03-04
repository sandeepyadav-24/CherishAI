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
exports.lyricsRouter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const lyrics_generator_1 = require("../services/lyrics-generator");
const router = (0, express_1.Router)();
dotenv_1.default.config();
router.post("/generate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, partnerName, memories, feeling } = req.body;
        const lyrics = yield (0, lyrics_generator_1.generateLyrics)({ partnerName, memories, feeling });
        res.json({ lyrics });
    }
    catch (error) {
        console.error("Error generating lyrics:", error);
        res.status(500).json({ error: "Failed to generate lyrics" });
    }
}));
exports.lyricsRouter = router;
