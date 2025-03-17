import { Router } from 'express';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications/index.js';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController.js';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);
export { specificationsRoutes };
