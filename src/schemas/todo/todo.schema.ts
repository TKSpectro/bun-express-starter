import { id, timestamps } from '@util/drizzle';
import {
    boolean,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';
import { accountSchema } from '../account/account.schema';

export const todoSchema = mysqlTable('todos', {
    ...id,
    ...timestamps,
    title: varchar('title', { length: 256 }).notNull(),
    description: text('description'),
    completed: boolean('completed').notNull().default(false),
    completedAt: timestamp('completed_at', { mode: 'date' }),
    priority: mysqlEnum('priority', ['low', 'medium', 'high']).notNull().default('low'),

    fk_account: int('fk_account')
        .notNull()
        .references(() => accountSchema.id),
});
