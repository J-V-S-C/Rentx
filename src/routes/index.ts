import { Router } from 'express';
import { categoriesRouter } from './categories.routes.js';
import { specificationsRouter } from './specification.routes.js';
import { usersRouter } from './users.routes.js';
import { authenticateRouter } from './authenticate.routes.js';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/users', usersRouter);
router.use(authenticateRouter);

export { router };
