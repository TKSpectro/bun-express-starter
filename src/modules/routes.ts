import { Application, Router } from 'express';
import { accountRouter } from './account/routes';

export const setupRoutes = (app: Application) => {
    app.get('/', (_req, res) => {
        res.send({ message: 'Hello World!' });
    });

    const api = Router();

    api.get('/', (_req, res) => {
        res.send({ message: 'Hello from API!' });
    });

    api.use('/accounts', accountRouter);

    app.use('/api', api);
};
