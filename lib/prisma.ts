import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Reuse one client across hot reloads in dev so we don't exhaust DB connections —
// but remember which connection string it was built with. If DATABASE_URL changes
// (a password reset, or the variable added after the server started) a fresh
// client is made, instead of the old one failing with "denied access" forever.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; prismaUrl?: string };

const url = process.env.DATABASE_URL;

function createClient() {
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

if (globalForPrisma.prisma && globalForPrisma.prismaUrl !== url) {
  void globalForPrisma.prisma.$disconnect().catch(() => {});
  globalForPrisma.prisma = undefined;
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaUrl = url;
}
