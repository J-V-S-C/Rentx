import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car | undefined>;
    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]>;

    findById(id: string): Promise<Car | undefined>;
    updateAvaiable(id: string, avaiable: boolean): Promise<void>
}

export type { ICarsRepository };
