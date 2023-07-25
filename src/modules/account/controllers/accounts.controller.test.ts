import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

beforeAll(() => {
    console.log('beforeAll account');
});

describe('account', () => {
    it('should pass', async () => {
        expect(true).toBe(true);

        const _res = await fetch('localhost:3000/api/accounts', {
            method: 'GET',
        });

        const res = await _res.json();

        console.log(res);
    });
});

describe('account', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

afterAll(() => {
    console.log('afterAll account');
});
