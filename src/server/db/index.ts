import { drizzle } from "drizzle-orm/singlestore";

import { env } from "~/env";
import * as schema from "./schema";
import { createPool, type Pool } from "mysql2/promise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = 
  globalForDb.conn ??
    createPool({
      password: env.SINGLESTORE_PASS,
      host: env.SINGLESTORE_HOST,
      port: parseInt(env.SINGLESTORE_PORT),
      user: env.SINGLESTORE_USER,
      database: env.SINGLESTORE_DATABASE,
      ssl: {},
      maxIdle: 0,
    })

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database error", err)
})

export const db = drizzle(conn, { schema });
