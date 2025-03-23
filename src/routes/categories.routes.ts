import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController.js';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController.js';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController.js';

const categoriesRouter = Router();

const upload: any = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouter };
