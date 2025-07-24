import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Entity, Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;
    constructor() {
        this.repository = AppDataSource.getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const rentalOpenByCar = await this.repository.findOneBy({ car_id });
        return rentalOpenByCar ?? undefined
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const rentalOpenByUser = await this.repository.findOneBy({ user_id });
        return rentalOpenByUser ?? undefined
    }
    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,


        })

        await this.repository.save(rental)
        return rental
    }
}

export { RentalsRepository }
