export * as Account from '.';

import { db } from '@core/database';
import { InferModel, eq, inArray } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { accountSchema } from './account.schema';

export type Info = InferModel<typeof accountSchema>;
export type New = InferModel<typeof accountSchema, 'insert'>;

export const zSelectSchema = createSelectSchema(accountSchema);
export const zCreateSchema = createInsertSchema(accountSchema, {
    email: (schema) => schema.email.email(),
});

export const findMany = async () => {
    return db.select().from(accountSchema);
};

export const findOne = async (id: number) => {
    return db
        .select()
        .from(accountSchema)
        .where(eq(accountSchema.id, id))
        .limit(1)
        .then((res) => res[0]);
};

export const createOne = async (account: New) => {
    return db
        .insert(accountSchema)
        .values(account)
        .then((res) => res[0]);
};

export const updateOne = async (id: number, account: Partial<New>) => {
    return db.update(accountSchema).set(account).where(eq(accountSchema.id, id));
};

export const deleteOne = async (id: number) => {
    return db.delete(accountSchema).where(eq(accountSchema.id, id));
};

export const deleteMany = async (ids: number[]) => {
    return db.delete(accountSchema).where(inArray(accountSchema.id, ids));
};
