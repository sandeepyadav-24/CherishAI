"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureFalClient = void 0;
// src/core/services/fal-client.ts
const client_1 = require("@fal-ai/client");
const configureFalClient = () => {
    client_1.fal.config({
        credentials: process.env.FALEN_API_KEY,
    });
};
exports.configureFalClient = configureFalClient;
