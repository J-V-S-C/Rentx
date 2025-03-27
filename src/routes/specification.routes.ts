import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController.js';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.use(ensureAuthentication);
specificationsRouter.post('/', createSpecificationController.handle);
specificationsRouter.get('/', listSpecificationsController.handle);
export { specificationsRouter };
