import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { Router } from 'express';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.post(
    '/',
    ensureAuthentication,
    ensureAdmin,
    createSpecificationController.handle,
);
specificationsRouter.get('/', listSpecificationsController.handle);
export { specificationsRouter };
