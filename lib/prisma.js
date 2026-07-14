import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  return new PrismaClient({ adapter });
}

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
  // console.log("Global this ==>", globalThis);
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
