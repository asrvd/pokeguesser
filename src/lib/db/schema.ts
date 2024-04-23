import { pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const pokemon = pgTable("pokemon", {
  id: integer("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
});
