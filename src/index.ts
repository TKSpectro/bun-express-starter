import { CONFIG } from '@core/config';
import { db } from '@core/database';
import { logger } from '@core/logger';
import { sql } from 'drizzle-orm';
import express from 'express';
import { equal } from 'node:assert';

const app = express();
const port = CONFIG.PORT;

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

try {
    const dbCall = (await db.execute(sql`SELECT 1 + 1 as result`)) as any;
    equal(dbCall[0][0].result, 2);
} catch (error) {
    logger.error({
        xLabel: 'Database',
        message: 'Failed to select from database',
        error,
    });
}

app.listen(port, () => {
    logger.info(`Listening on port ${port}...`);
});
