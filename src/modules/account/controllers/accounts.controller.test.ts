import { logger } from '@core/logger';
import { Account } from '@schemas/account';
import { getAppURL } from '@tests/helper';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import request from 'supertest';

describe('AccountsController', () => {
    describe('actionIndex', () => {
        it('no accounts', async () => {
            const res = await request(getAppURL()).get('/api/accounts');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('accounts');
            expect(res.body.accounts).toHaveLength(0);
        });

        describe('with accounts', () => {
            const accountIds: number[] = [];
            beforeAll(async () => {
                for (let i = 0; i < 20; i++) {
                    accountIds.push(
                        (
                            await Account.createOne({
                                name: `accounts-index-${i}`,
                                email: `accounts-index-${i}@turbomeet.xyz`,
                            })
                        ).insertId,
                    );
                }
            });

            it('should pass', async () => {
                const res = await request(getAppURL()).get('/api/accounts').send();
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('accounts');
                expect(res.body.accounts).toHaveLength(20);
            });

            afterAll(async () => {
                await Account.deleteMany(accountIds);

                logger.info(
                    `[Test][AccountsController][actionIndex] Deleted ${accountIds.length} accounts`,
                );
            });
        });

        afterAll(async () => {
            logger.info('actionIndex afterAll');
        });
    });

    afterAll(async () => {
        logger.info('AccountsController afterAll');
    });
});
