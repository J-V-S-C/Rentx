import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController.js';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController.js';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.post('/', createSpecificationController.handle);
specificationsRouter.get('/', listSpecificationsController.handle);
export { specificationsRouter };
