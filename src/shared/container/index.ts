import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository.js';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository.js';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
