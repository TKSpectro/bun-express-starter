import { CONFIG } from '@core/config';
import { poolConnection } from '@core/database';
import { logger } from '@core/logger';
import { setupRoutes } from '@modules/routes';
import bodyParser from 'body-parser';
import express, { ErrorRequestHandler } from 'express';
import { Server } from 'node:http';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err });
};

let server: Server | null = null;
export async function startApp() {
    return new Promise((resolve) => {
        const app = express();
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
        server.close();
    }
    await poolConnection.end();
}
