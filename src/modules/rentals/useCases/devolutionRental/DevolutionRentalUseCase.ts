import { AppError } from "@errors/AppError";
import type { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import type { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    rental_id: string,
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsReposirory: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }
    async execute({ rental_id }: IRequest): Promise<Rental> {
        const minimum_daily = 1;

        const rental = await this.rentalsReposirory.findById(rental_id);
        if (!rental) {
            throw new AppError("Rental does not exist");
        }

        const car = await this.carsRepository.findById(rental.car_id);
        if (!car) {
            throw new AppError("Car is not rented");
        }

        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
        if (daily < 1) {
            daily = minimum_daily;
        }

        let total = 0;
        const delay = this.dateProvider.compareInDays(this.dateProvider.dateNow(), rental.expected_return_date);
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }
        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsReposirory.create(rental)

        await this.carsRepository.updateAvaiable(car.id, true);
        return rental
    }
}

export { DevolutionRentalUseCase }
