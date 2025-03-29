import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { Router } from 'express';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.use(ensureAuthentication);
specificationsRouter.post('/', createSpecificationController.handle);
specificationsRouter.get('/', listSpecificationsController.handle);
export { specificationsRouter };
