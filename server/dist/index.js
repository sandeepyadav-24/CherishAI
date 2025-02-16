"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lyrics_1 = require("./routes/lyrics");
const song_routes_1 = __importDefault(require("./routes/song-routes"));
const configure_fal_client_1 = require("./config/configure-fal-client");
const prisma_client_1 = __importDefault(require("./config/prisma-client"));
const app = (0, express_1.default)();
const port = 3002;
// GLobal Middleware
app.use(express_1.default.json());
// Configure FAL client
(0, configure_fal_client_1.configureFalClient)();
app.use("/api/v1/lyrics", lyrics_1.lyricsRouter);
app.use("/api/v1/song", song_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// Connect to Prisma
prisma_client_1.default.$connect().then(() => {
    console.log("Connected to PostgreSQL via Prisma");
});
