import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import uploadConfig from '@config/upload';
import multer from 'multer';

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const uploadImages = multer(uploadConfig.upload('./tmp/cars'));
carsRouter.post(
    '/',
    ensureAuthentication,
    ensureAdmin,
    createCarController.handle,
);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.post(
    '/specifications/:id',
    ensureAuthentication,
    ensureAdmin,
    createCarSpecificationController.handle,
);

carsRouter.post(
    '/images/:id',
    ensureAuthentication,
    ensureAdmin,
    uploadImages.array('images'),
    uploadCarImageController.handle,
);


export { carsRouter };
