// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator(
  (name) => `valuta_app_${name}`,
);

export const transactions_table = createTable(
  "transactions_table",
  (d) => ({
    id: d
      .bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    amount: d.text("amount").notNull(),
    createdAt: d.timestamp("created_at").notNull().defaultNow(),
    senderId: d.text("sender_id").notNull(),
    receiverName: d.text("receiver_name").notNull(),
  }),
  (t) => {
    return [
      index("sender_id_index").on(t.senderId),
      index("receiver_name_index").on(t.receiverName),
    ];
  },
);
