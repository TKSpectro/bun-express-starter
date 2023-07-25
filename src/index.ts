import { logger } from '@core/logger';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    logger.info(`Listening on port ${port}...`);
});
