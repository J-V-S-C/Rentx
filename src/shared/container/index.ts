import { container } from 'tsyringe';
import '@shared/container/providers';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';

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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository,
);

container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository,
)
