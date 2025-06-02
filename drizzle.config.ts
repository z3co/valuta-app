import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    password: env.SINGLESTORE_PASS,
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    database: env.SINGLESTORE_DATABASE,
    ssl: {},
  },
  tablesFilter: ["valuta_app_*"],
} satisfies Config;
