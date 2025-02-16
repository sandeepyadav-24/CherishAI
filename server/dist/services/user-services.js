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
exports.UserService = void 0;
// src/services/user.service.ts
const prisma_client_1 = __importDefault(require("../config/prisma-client"));
exports.UserService = {
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.default.user.findUnique({
                where: { id: userId },
            });
        });
    },
    getUserCredits(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.default.user.findUnique({
                where: { id: userId },
                select: { credits: true },
            });
            return (user === null || user === void 0 ? void 0 : user.credits) || 0;
        });
    },
    deductCredits(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!user || user.credits < amount) {
                throw new Error("Insufficient credits");
            }
            return prisma_client_1.default.user.update({
                where: { id: userId },
                data: { credits: user.credits - amount },
            });
        });
    },
    addCredits(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.default.user.update({
                where: { id: userId },
                data: { credits: { increment: amount } },
            });
        });
    },
};
