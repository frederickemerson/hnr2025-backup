// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator, text,
  timestamp, uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {datetime} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hnr2025_${name}`);

export const users = createTable("users", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  name: text('name').notNull(),
  score: integer("score"),
  createdAt: timestamp().notNull().default(sql`now()`),
  finishedAt: timestamp(),
  updatedAt: timestamp().notNull().default(sql`now()`)
})
