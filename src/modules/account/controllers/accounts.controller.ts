import { logger } from '@core/logger';
import { zParse } from '@util/zod';
import { Handler } from 'express';
import { Account } from 'src/schemas/account';
import { z } from 'zod';

export const Index: Handler = async (_req, res) => {
    const accounts = await Account.findMany();

    res.send({
        accounts: accounts,
    });
};

const ShowSchema = z.object({
    params: z.object({
        id: z.coerce.number().int(),
    }),
});

export const Show: Handler = async (req, res) => {
    const { params } = await zParse(ShowSchema, req);

    const account = await Account.findOne(params.id);

    res.send({
        account: account,
    });
};

const CreateSchema = z.object({
    body: Account.zCreateSchema,
});

export const Create: Handler = async (req, res) => {
    const { body } = await zParse(CreateSchema, req);

    const account = await Account.createOne(body);

    res.status(201).send({
        account: account,
    });
};

const UpdateSchema = z.object({
    params: z.object({
        id: z.coerce.number().int(),
    }),
    body: Account.zCreateSchema,
});

export const Update: Handler = async (req, res) => {
    const { params, body } = await zParse(UpdateSchema, req);

    const account = await Account.findOne(params.id);
    if (!account) {
        throw new Error('Account not found');
    }

    await Account.updateOne(account.id, body);

    res.status(200).send({
        account: account,
    });
};

const DeleteSchema = z.object({
    params: z.object({
        id: z.coerce.number().int(),
    }),
});

export const Delete: Handler = async (req, res) => {
    const { params } = await zParse(DeleteSchema, req);

    const result = await Account.deleteOne(params.id);

    logger.info(result);

    res.status(204).send({});
};
