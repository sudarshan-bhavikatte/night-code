import dotenv from "dotenv";
import path from "path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client.ts";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

// Resolve a `file:` SQLite URL to an absolute path anchored at the database
// package, so the same dev.db is used no matter which directory the process
// was started from.
function resolveSqliteUrl(url: string) {
  if (!url.startsWith("file:")) {
    return url;
  }

  const filePath = url.slice("file:".length);
  if (path.isAbsolute(filePath)) {
    return url;
  }

  const absolutePath = path.resolve(import.meta.dirname, "..", filePath);
  return `file:${absolutePath}`;
}

// libSQL's client runs on Bun (unlike the native better-sqlite3 driver) and
// speaks to a local SQLite file via a `file:` URL.
const adapter = new PrismaLibSql({ url: resolveSqliteUrl(databaseUrl) });

export const db = new PrismaClient({ adapter });
