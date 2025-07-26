import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController()

rentalRouter.post(
    '/',
    ensureAuthentication,
    createRentalController.handle
);

rentalRouter.post('/devolution/:id', ensureAuthentication, devolutionRentalController.handle)

rentalRouter.get('/', ensureAuthentication, listRentalsByUserController.handle)
export { rentalRouter };
