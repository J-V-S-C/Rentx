import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';
import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

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
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOneBy({ license_plate });

        return car ?? undefined;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('brand = :brand', { brand });
        }

        if (category_id) {
            carsQuery.andWhere('category_id = :category_id', { category_id });
        }

        if (name) {
            carsQuery.andWhere('name = :name', { name });
        }
        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car | undefined> {
        const car = await this.repository.findOneBy({ id });
        return car ?? undefined;
    }

    async updateAvaiable(id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder().update().set({ available }).where("id = :id").setParameters({ id }).execute()

    }
}

export { CarsRepository };
