export * as Todo from '.';

import { db } from '@core/database';
import { InferModel, eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { todoSchema } from './todo.schema';

export type Info = InferModel<typeof todoSchema>;
export type New = InferModel<typeof todoSchema, 'insert'>;

export const zSelectSchema = createSelectSchema(todoSchema);
export const zCreateSchema = createInsertSchema(todoSchema);

export const findMany = async () => {
    return db.select().from(todoSchema);
};

export const findOne = async (id: number) => {
    return db
        .select()
        .from(todoSchema)
        .where(eq(todoSchema.id, id))
        .limit(1)
        .then((res) => res[0]);
};

export const createOne = async (account: New) => {
    return db.insert(todoSchema).values(account);
};

export const updateOne = async (id: number, account: Partial<New>) => {
    return db.update(todoSchema).set(account).where(eq(todoSchema.id, id));
};

export const deleteOne = async (id: number) => {
    return db.delete(todoSchema).where(eq(todoSchema.id, id));
};
