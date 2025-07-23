import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 1',
            description: 'Car description',
            daily_rate: 900,
            license_plate: 'ABC-123',
            fine_amount: 100,
            brand: 'Car brand',
            category_id: 'Category_ID',
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Car brand test',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'DEF-456',
            fine_amount: 100,
            brand: 'Car_brand_test',
            category_id: 'Category_ID',
        });

        const car2 = await carsRepositoryInMemory.create({
            name: 'Other car',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'XYZ-123',
            fine_amount: 100,
            brand: 'Wrong_brand',
            category_id: 'Category_ID',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_brand_test',
        });

        expect(cars).toEqual([car1]);
        expect(cars).not.toContain(car2);
    });

    it('should be able to list all available cars by name', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Car name test',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'GHI-789',
            fine_amount: 100,
            brand: 'Brand name test',
            category_id: 'Category_ID',
        });

        const car2 = await carsRepositoryInMemory.create({
            name: 'Wrong name',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'LMN-987',
            fine_amount: 100,
            brand: 'Brand name test',
            category_id: 'Category_ID',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car name test',
        });

        expect(cars).toEqual([car1]);
        expect(cars).not.toContain(car2);
    });

    it('should be able to list all available cars by category_id', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Car category_id test',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'JKL-012',
            fine_amount: 100,
            brand: 'Brand category_id test',
            category_id: 'category_id',
        });

        const car2 = await carsRepositoryInMemory.create({
            name: 'Other category car',
            description: 'Description',
            daily_rate: 900,
            license_plate: 'MNO-345',
            fine_amount: 100,
            brand: 'Brand category_id test',
            category_id: 'wrong_category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'category_id',
        });

        expect(cars).toEqual([car1]);
        expect(cars).not.toContain(car2);
    });
});
