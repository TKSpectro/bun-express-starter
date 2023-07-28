import defaultConfig from './drizzle.config';

import { Config } from 'drizzle-kit';
import { CONFIG } from './src/core/config';

export default {
    ...defaultConfig,
    dbCredentials: {
        host: CONFIG.DATABASE_TEST_HOST,
        port: CONFIG.DATABASE_TEST_PORT,
        user: CONFIG.DATABASE_TEST_USER,
        database: CONFIG.DATABASE_TEST_NAME,
        password: CONFIG.DATABASE_TEST_PASSWORD,
    },
    // Disable strict mode to not have to accept db migrations
    strict: false,
} satisfies Config;
