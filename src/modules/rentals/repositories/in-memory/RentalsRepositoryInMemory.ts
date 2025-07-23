import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";
import { AppError } from "@errors/AppError";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null)

    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null)
    }

}

export { RentalsRepositoryInMemory }
