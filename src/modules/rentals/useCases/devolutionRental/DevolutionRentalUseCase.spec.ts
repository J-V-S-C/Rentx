import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let devolutionRentalUseCase: DevolutionRentalUseCase
let carsRepositoryInMemory: ICarsRepository
let dayjsDateProvider: DayjsDateProvider

describe("Returning Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        devolutionRentalUseCase = new DevolutionRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider)

    });

    it("Should be able to return a rental", async () => {
        const car = await carsRepositoryInMemory.create({
            id: "121212",
            name: "Test Car 1",
            description: "Test",
            daily_rate: 100,
            license_plate: "TEST-1212",
            fine_amount: 40,
            brand: "TestBrand",
            category_id: "cat1"
        });

        const rental = await rentalsRepositoryInMemory.create({
            id: "391143431",
            car_id: car.id,
            user_id: "2318031",
            total: 4,
            expected_return_date: new Date
        })
        await devolutionRentalUseCase.execute({ rental_id: rental.id })
        expect(car?.available).toBe(true);
        expect(rental.total).not.toBe(null)
    });

});
