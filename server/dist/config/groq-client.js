"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroqClient = void 0;
// groq-client.ts
const groq_sdk_1 = require("groq-sdk");
const getGroqClient = () => {
    return new groq_sdk_1.Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
};
exports.getGroqClient = getGroqClient;
