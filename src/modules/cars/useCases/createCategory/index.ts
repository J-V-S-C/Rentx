import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.js';
import { CreateCategoryController } from './CreateCategoryController.js';
import { CreateCategoryUseCase } from './CreateCategoryUseCase.js';

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  );

  return createCategoryController;
};
