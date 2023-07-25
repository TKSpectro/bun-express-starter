import { Router } from 'express';
import { Index, Show } from './controllers/accounts.controller';

export const accountRouter = Router();

accountRouter.get('/', Index);
accountRouter.get('/:id', Show);
