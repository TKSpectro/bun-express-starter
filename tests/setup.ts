import { startApp, stopApp } from '@core/app';
import { afterAll, beforeAll } from 'bun:test';

// TODO: Need to fix tests not finishing
beforeAll(async () => {
    console.log('Before all');

    await startApp();
});

afterAll(async () => {
    console.log('After all');
    await stopApp();
});
