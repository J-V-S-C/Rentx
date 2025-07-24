import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post(
    '/',
    ensureAuthentication,
    ensureAdmin,
    createRentalController.handle
);
export { rentalRouter };
