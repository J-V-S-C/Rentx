import { Router } from 'express';
import multer, { Multer } from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController.js';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController.js';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController.js';

const categoriesRoutes = Router();

const upload: any = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
