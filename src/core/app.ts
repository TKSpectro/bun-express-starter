import { CONFIG } from '@core/config';
import { connectDatabase, poolConnection } from '@core/database';
import { logger } from '@core/logger';
import { setupRoutes } from '@modules/routes';
import bodyParser from 'body-parser';
import express, { Application, ErrorRequestHandler } from 'express';
import { Server } from 'node:http';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err });
};

let app: Application | null = null;
let server: Server | null = null;

export async function startApp() {
    return new Promise((resolve) => {
        connectDatabase();

        app = express();
        const port = CONFIG.PORT;

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        setupRoutes(app);

        app.use(errorHandler);

        server = app.listen(port, () => {
            logger.info(`Listening on port ${port}...`);
            resolve(null);
        });
    });
}

export async function stopApp() {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
        });
    }
    await poolConnection?.end();
}

export function getApp() {
    return app;
}

export function getServer() {
    return server;
}
