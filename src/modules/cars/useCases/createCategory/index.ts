import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.js';
import { CreateCategoryController } from './CreateCategoryController.js';
import { CreateCategoryUseCase } from './CreateCategoryUseCase.js';

const categoriesRepository = CategoriesRepository.geiInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };
