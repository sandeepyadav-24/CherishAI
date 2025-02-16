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
exports.generateLyrics = void 0;
const groq_client_1 = require("../config/groq-client");
const prompt_generator_1 = require("./prompt-generator");
const generateLyrics = (params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const groq = (0, groq_client_1.getGroqClient)();
    const prompt = (0, prompt_generator_1.generateLyricsPrompt)(params);
    const chatCompletion = yield groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
    });
    return (_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
});
exports.generateLyrics = generateLyrics;
