import "server-only";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const readDatabaseUrl = () => {
  const databaseUrl = process.env.DATABASE_URL?.trim().replace(/^['"]|['"]$/g, "");

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in your environment variables");
  }

  if (!databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("postgresql://")) {
    throw new Error("DATABASE_URL must be a Postgres connection string");
  }

  return databaseUrl;
};

const createPrismaClient = () => {
  const connectionString = readDatabaseUrl();
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
