import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRouter = Router();

const upload: any = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post(
    '/',
    ensureAuthentication,
    ensureAdmin,
    createCategoryController.handle,
);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
    '/import',
    upload.single('file'),
    ensureAuthentication,
    ensureAdmin,
    importCategoryController.handle,
);

export { categoriesRouter };
