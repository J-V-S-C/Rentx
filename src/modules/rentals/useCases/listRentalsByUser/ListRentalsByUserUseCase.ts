import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import type { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }
    async execute(user_id: string): Promise<Rental[] | null> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id)
        return rentalsByUser
    }

}

export { ListRentalsByUserUseCase }
