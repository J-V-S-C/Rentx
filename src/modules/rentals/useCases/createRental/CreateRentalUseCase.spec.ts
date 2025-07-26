import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@errors/AppError"
import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let carsRepositoryInMemory: ICarsRepository
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
    const dayAdd24Hour = dayjs().add(1, "day").toDate()
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        await carsRepositoryInMemory.create({
            id: "121212",
            name: "Test Car 1",
            description: "Test",
            daily_rate: 100,
            license_plate: "TEST-1212",
            fine_amount: 40,
            brand: "TestBrand",
            category_id: "cat1"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hour,
        });

        const car = await carsRepositoryInMemory.findById(rental.car_id);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
        expect(car?.available).toBe(false);
    });

    it("Should not allow a user to start a new rental while one is in progress", async () => {
        await carsRepositoryInMemory.create({
            id: "121212",
            name: "Car A",
            description: "Test A",
            daily_rate: 100,
            license_plate: "TEST-A",
            fine_amount: 40,
            brand: "Brand A",
            category_id: "cat1"
        });

        await carsRepositoryInMemory.create({
            id: "212121",
            name: "Car B",
            description: "Test B",
            daily_rate: 100,
            license_plate: "TEST-B",
            fine_amount: 40,
            brand: "Brand B",
            category_id: "cat1"
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hour,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "212121",
                expected_return_date: dayAdd24Hour,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Should not allow a car to be rented if it is already in use", async () => {
        await carsRepositoryInMemory.create({
            id: "121212",
            name: "Shared Car",
            description: "Test Shared",
            daily_rate: 100,
            license_plate: "SHARED-01",
            fine_amount: 40,
            brand: "BrandShared",
            category_id: "cat1"
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hour,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "54321",
                car_id: "121212",
                expected_return_date: dayAdd24Hour,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await carsRepositoryInMemory.create({
            id: "121212",
            name: "Invalid Return Car",
            description: "Test",
            daily_rate: 100,
            license_plate: "INVALID-01",
            fine_amount: 40,
            brand: "Brand",
            category_id: "cat1"
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
