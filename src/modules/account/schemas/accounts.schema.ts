import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const accountSchema = mysqlTable('accounts', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
    email: varchar('email', { length: 256 }).unique('email_idx'),
});

export type Account = InferModel<typeof accountSchema>;
