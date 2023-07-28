import { startApp, stopApp } from '@core/app';
import { CONFIG } from '@core/config';
import { logger } from '@core/logger';
import { afterAll, beforeAll } from 'bun:test';
import { createConnection } from 'mysql2/promise';
import { execSync } from 'node:child_process';

beforeAll(async () => {
    logger.info('[Test][Setup][BeforeAll]');
    const conn = await createConnection({
        host: CONFIG.DATABASE_TEST_HOST,
        port: CONFIG.DATABASE_TEST_PORT,
        user: CONFIG.DATABASE_TEST_USER,
        password: CONFIG.DATABASE_TEST_PASSWORD,
    });

    await conn.query(`DROP DATABASE IF EXISTS ${CONFIG.DATABASE_TEST_NAME}`);
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${CONFIG.DATABASE_TEST_NAME}`);
    await conn.end();
    logger.info('[Test][Setup][BeforeAll] Database created');

    execSync('bunx drizzle-kit push:mysql --config=drizzle.test_config.ts');
    logger.info('[Test][Setup][BeforeAll] Database migrated');

    await startApp();
});

afterAll(async () => {
    logger.info('[Test][Setup][AfterAll]');

    await stopApp();

    const conn = await createConnection({
        host: CONFIG.DATABASE_TEST_HOST,
        port: CONFIG.DATABASE_TEST_PORT,
        user: CONFIG.DATABASE_TEST_USER,
        password: CONFIG.DATABASE_TEST_PASSWORD,
    });

    await conn.query(`DROP DATABASE IF EXISTS ${CONFIG.DATABASE_TEST_NAME}`);
    await conn.end();
    logger.info('[Test][Setup][AfterAll] Database dropped');
});
