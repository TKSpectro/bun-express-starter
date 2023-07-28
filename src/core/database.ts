import { CONFIG } from '@core/config';
import { logger } from '@core/logger';
import { Logger } from 'drizzle-orm';
import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

class DatabaseLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        logger.info({ xLabel: 'Database', query, params });
    }
}

export let poolConnection: mysql.Pool;
export let db: MySql2Database;

export const connectDatabase = async () => {
    const isTest = process.env.NODE_ENV === 'test';

    poolConnection = mysql.createPool({
        host: isTest ? CONFIG.DATABASE_TEST_HOST : CONFIG.DATABASE_HOST,
        port: isTest ? CONFIG.DATABASE_TEST_PORT : CONFIG.DATABASE_PORT,
        user: isTest ? CONFIG.DATABASE_TEST_USER : CONFIG.DATABASE_USER,
        database: isTest ? CONFIG.DATABASE_TEST_NAME : CONFIG.DATABASE_NAME,
        password: isTest ? CONFIG.DATABASE_TEST_PASSWORD : CONFIG.DATABASE_PASSWORD,
        pool: {
            min: CONFIG.DATABASE_POOL_MIN,
            max: CONFIG.DATABASE_POOL_MAX,
        },

        idleTimeout: CONFIG.DATABASE_POOL_IDLE,
    });

    db = drizzle(poolConnection, {
        logger: CONFIG.DATABASE_LOGGING ? new DatabaseLogger() : false,
    });

    logger.info({
        xLabel: 'Database',
        message: 'connecting: ',
        host: isTest ? CONFIG.DATABASE_TEST_HOST : CONFIG.DATABASE_HOST,
        port: isTest ? CONFIG.DATABASE_TEST_PORT : CONFIG.DATABASE_PORT,
        user: isTest ? CONFIG.DATABASE_TEST_USER : CONFIG.DATABASE_USER,
        database: isTest ? CONFIG.DATABASE_TEST_NAME : CONFIG.DATABASE_NAME,
        password: isTest ? CONFIG.DATABASE_TEST_PASSWORD : CONFIG.DATABASE_PASSWORD,
    });
};
