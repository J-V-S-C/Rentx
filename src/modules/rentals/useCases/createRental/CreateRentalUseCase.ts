import { AppError } from "@errors/AppError";
import type { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import type { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHoursToCompare = 24
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (carUnavailable) {
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for user!")
        }


        const dateNow = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)
        if (compare < minimumHoursToCompare) {
            throw new AppError("Invalid return time!")
        }


        const rental = await this.rentalsRepository.create({
            user_id, car_id, expected_return_date
        })
        await this.carsRepository.updateAvaiable(car_id, false)

        return rental
    }


}


export { CreateRentalUseCase }
