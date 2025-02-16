// prisma/seed.ts
import prisma from "../config/prisma-client";

async function seed() {
  await prisma.user.create({
    data: {
      email: "user@example.com",
      credits: 1,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
