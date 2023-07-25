import info from '../../package.json';
import { createEnv } from '@t3-oss/env-core';
import path from 'path';
import { z } from 'zod';

const asBoolean = (s: string) => s !== 'false' && s !== '0';
const asNumber = (s: string) => parseInt(s, 10);

export const CONFIG = createEnv({
    server: {
        VERSION: z.string().optional().default('1.0'),
        BUILD: z.string().optional().default('dev'),
        NODE_ENV: z
            .string()
            .optional()
            .default('development')
            .pipe(z.enum(['development', 'production', 'test'])),

        LOG_LEVEL: z
            .string()
            .optional()
            .default('info')
            .pipe(z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])),

        NUMBER_OF_PROCESSES: z
            .string()
            .optional()
            .default('1')
            .transform(asNumber)
            .pipe(z.number().positive()),
        PORT: z.coerce.number().int().positive().optional().default(3000),

        CORS_ENABLED: z.string().default('false').transform(asBoolean),

        JWKS_PUB_URL: z.string().optional().default(path.join(process.cwd(), './jwks.json')),
        JWT_AUTH_EXPIRE: z.string().optional().default('5m'),
        JWT_REFRESH_EXPIRE: z.string().optional().default('72h'),

        DATABASE_HOST: z.string().optional().default('localhost'),
        DATABASE_PORT: z
            .string()
            .optional()
            .default('3306')
            .transform(asNumber)
            .pipe(z.number().positive()),
        DATABASE_NAME: z.string().optional().default(info.name),
        DATABASE_USER: z.string().optional().default('root'),
        DATABASE_PASSWORD: z.string().optional(),
        DATABASE_LOGGING: z.string().optional().default('false').transform(asBoolean),

        DATABASE_POOL_MIN: z
            .string()
            .optional()
            .default('0')
            .transform(asNumber)
            .pipe(z.number().min(0)),
        DATABASE_POOL_MAX: z
            .string()
            .optional()
            .default('5')
            .transform(asNumber)
            .pipe(z.number().positive()),
        DATABASE_POOL_IDLE: z
            .string()
            .optional()
            .default('10000')
            .transform(asNumber)
            .pipe(z.number().positive()),
        DATABASE_POOL_ACQUIRE: z
            .string()
            .optional()
            .default('30000')
            .transform(asNumber)
            .pipe(z.number().positive()),

        // If set to true, the application will run the sequelize:migrate command on startup
        DATABASE_AUTO_MIGRATION: z.string().optional().default('false').transform(asBoolean),

        TEST_DATABASE_HOST: z.string().optional().default('localhost'),
        TEST_DATABASE_PORT: z
            .string()
            .optional()
            .default('3306')
            .transform(asNumber)
            .pipe(z.number().positive()),
        TEST_DATABASE_NAME: z.string().optional().default(`${info.name}_test`),
        TEST_DATABASE_USER: z.string().optional().default('root'),
        TEST_DATABASE_PASSWORD: z.string().optional(),

        TIMEZONE: z.string().optional().default('Europe/Berlin'),
    },

    runtimeEnv: process.env,
    isServer: true,

    // client stuff can be ignored
    clientPrefix: 'PUBLIC_',
    client: {},
});
