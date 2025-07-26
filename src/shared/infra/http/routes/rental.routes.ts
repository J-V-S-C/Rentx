import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post(
    '/',
    ensureAuthentication,
    ensureAdmin,
    createRentalController.handle
);

rentalRouter.post('/devolution/:id', ensureAuthentication, ensureAdmin, devolutionRentalController.handle)
export { rentalRouter };
