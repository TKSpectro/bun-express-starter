import { id, timestamps } from '@util/drizzle';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const accountSchema = mysqlTable('accounts', {
    ...id,
    ...timestamps,
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique('email_idx'),
    password: varchar('password', { length: 256 }),
    tokenSecret: varchar('token_secret', { length: 8 }),
});
