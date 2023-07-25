import { CONFIG } from '@core/config';
import { logger } from '@core/logger';
import { Logger } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const poolConnection = mysql.createPool({
    host: CONFIG.DATABASE_HOST,
    port: CONFIG.DATABASE_PORT,
    user: CONFIG.DATABASE_USER,
    database: CONFIG.DATABASE_NAME,
    password: CONFIG.DATABASE_PASSWORD,
    pool: {
        min: CONFIG.DATABASE_POOL_MIN,
        max: CONFIG.DATABASE_POOL_MAX,
    },

    idleTimeout: CONFIG.DATABASE_POOL_IDLE,
});

class DatabaseLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        logger.info({ xLabel: 'Database', query, params });
    }
}

logger.info(
    `[Database] Connecting to ${CONFIG.DATABASE_USER}@${CONFIG.DATABASE_HOST}:${CONFIG.DATABASE_PORT}/${CONFIG.DATABASE_NAME}`,
);

export const db = drizzle(poolConnection, {
    logger: CONFIG.DATABASE_LOGGING ? new DatabaseLogger() : false,
});
