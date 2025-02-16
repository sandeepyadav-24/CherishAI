// src/services/user.service.ts
import prisma from "../config/prisma-client";

export const UserService = {
  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  async getUserCredits(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
    return user?.credits || 0;
  },

  async deductCredits(userId: string, amount: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.credits < amount) {
      throw new Error("Insufficient credits");
    }

    return prisma.user.update({
      where: { id: userId },
      data: { credits: user.credits - amount },
    });
  },

  async addCredits(userId: string, amount: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    });
  },
};
