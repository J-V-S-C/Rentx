import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            available: true,
            specifications,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> {
        return this.cars.filter((car) => {
            return car.available &&
                (!brand || car.brand === brand) &&
                (!category_id || car.category_id === category_id) &&
                (!name || car.name === name)
        })



    }

    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find(car => car.id === id);
    }

    async updateAvaiable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id)
        this.cars[findIndex].available = available

    }
}

export { CarsRepositoryInMemory };
