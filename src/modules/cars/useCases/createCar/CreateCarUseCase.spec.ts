import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'TestName',
      description: 'TestDescription',
      daily_number: 300,
      license_plate: 'abcd12',
      fine_amount: 30,
      brand: 'BrandTest',
      category_id: 'ULALA',
    });
  });
});
