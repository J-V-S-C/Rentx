import { Router } from 'express';
import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specification.routes';
import { usersRouter } from './users.routes';
import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/users', usersRouter);
router.use('/cars', carsRouter);
router.use(authenticateRouter);

export { router };
