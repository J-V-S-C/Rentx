import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { AppError } from '@errors/AppError';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationReposiotryInMemory: SpecificationRepositoryInMemory;
describe('Create car specification', () => {
    beforeEach(() => {
        specificationReposiotryInMemory = new SpecificationRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationReposiotryInMemory,
        );
    });
    it('Should be able to add a new specification to a new-existent car', async () => {
        const car_id = '1234';
        const specifications_id = ['54321'];
        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists!"))


    });

    it('Should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'TestName',
            description: 'TestDescription',
            daily_rate: 300,
            license_plate: 'abcd12',
            fine_amount: 30,
            brand: 'BrandTest',
            category_id: 'category',
        });
        const specification = await specificationReposiotryInMemory.create({
            name: 'Test',
            description: 'testing',
        });
        const specifications_id = [specification.id];
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
