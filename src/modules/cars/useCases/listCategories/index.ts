import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.js';
import { ListCategoriesController } from './ListCategoriesController.js';
import { ListCategoriesUseCase } from './ListCategoriesUseCase.js';
const categoriesRepository = CategoriesRepository.geiInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };
