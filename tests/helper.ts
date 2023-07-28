import { getServer } from '@core/app';
import { sql } from 'drizzle-orm';

let url: string | null = null;

export const getAppURL = () => {
    if (!url) {
        const address = getServer()?.address();

        if (typeof address === 'string') {
            url = address;
        } else {
            url = `http://${address?.address}:${address?.port}`;
        }
    }

    return url;
};

export const clearTable = async (table: string) => {
    const { db } = await import('@core/database');
    await db.execute(sql`TRUNCATE TABLE ${table}`);
};
