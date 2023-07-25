import { sql } from 'drizzle-orm';
import { int, timestamp } from 'drizzle-orm/mysql-core';

export const id = {
    id: int('id').autoincrement().notNull().primaryKey(),
};

export const timestamps = {
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`)
        .onUpdateNow(),
};
