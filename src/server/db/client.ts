import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";

// postgre imports for prisma
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
// no need for adapters and pools, since prisma manages database connections
// // adapter for pgsql
// const connectionString = env.DATABASE_URL;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

// Initialize the Prisma client for database interactions
// This client will be used throughout the application to perform database operations
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
