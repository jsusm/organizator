import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable(
  "categories_table",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    color: text("color").notNull().default("gray"),
    icon: text("icon").notNull(),
  },
  () => [],
);

export const operations = sqliteTable(
  "operations_table",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: integer("date", { mode: "timestamp" }).notNull(),
    amount: integer("amount").notNull(),
    categoryId: integer("category_id").references(() => categories.id, { onDelete: 'set null'}),
    description: text("description"),
  },
  () => [],
);
