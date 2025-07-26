import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;
    constructor() {
        this.repository = AppDataSource.getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const rentalOpenByCar = await this.repository.findOne({ where: { car_id, end_date: null } });
        return rentalOpenByCar ?? undefined
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const rentalOpenByUser = await this.repository.findOne({ where: { user_id, end_date: null } });
        return rentalOpenByUser ?? undefined
    }
    async create({ total, car_id, user_id, expected_return_date, id, end_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        })
        await this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rental | null> {
        const rental = await this.repository.findOneBy({ id })
        return rental
    }

}

export { RentalsRepository }
