import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRouter = Router();

let createCarController = new CreateCarController();
carsRouter.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle,
);

export { carsRouter };
