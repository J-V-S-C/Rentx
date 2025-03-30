import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';
import { AppError } from '@errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'TestName',
      description: 'TestDescription',
      daily_rate: 300,
      license_plate: 'abcd12',
      fine_amount: 30,
      brand: 'BrandTest',
      category_id: 'ULALA',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with existent license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description Car1',
        daily_rate: 300,
        license_plate: 'abcd12',
        fine_amount: 30,
        brand: 'Brand',
        category_id: 'category',
      });
      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description Car2',
        daily_rate: 300,
        license_plate: 'abcd12',
        fine_amount: 30,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a car with avaiable true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car1',
      daily_rate: 300,
      license_plate: 'ABCD-1234',
      fine_amount: 30,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
