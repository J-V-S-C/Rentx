import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository.js';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository.js';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository.js';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository.js';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository.js';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository.js';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
