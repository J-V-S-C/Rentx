import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.js';
import { ImportCategoryController } from './ImportCategoryController.js';
import { ImportCategoryUseCase } from './ImportCategoryUseCase.js';
const categoriesRepository = new CategoriesRepository();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
