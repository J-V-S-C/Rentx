import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.js';
import { ListCategoriesController } from './ListCategoriesController.js';
import { ListCategoriesUseCase } from './ListCategoriesUseCase.js';
const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
