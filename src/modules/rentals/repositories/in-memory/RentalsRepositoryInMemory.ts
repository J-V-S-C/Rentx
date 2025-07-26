import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []

    async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
        const rental = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
        return rental ?? null
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
        const rental = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
        return rental ?? null
    }

    async create({ total, user_id, car_id, expected_return_date, id, end_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()
        Object.assign(rental, {
            total,
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
            id,
            end_date,
        })
        this.rentals.push(rental)
        return rental
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = this.rentals.find(rental => rental.id === id)
        return rental || null
    }

    async findByUser(user_id: string): Promise<Rental[] | null> {
        const rentals = this.rentals.filter(rental => rental.user_id === user_id)
        return rentals
    }

}

export { RentalsRepositoryInMemory }
