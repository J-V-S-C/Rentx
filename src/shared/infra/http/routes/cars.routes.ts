import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
carsRouter.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle,
);

carsRouter.get('/available', listAvailableCarsController.handle);
export { carsRouter };
