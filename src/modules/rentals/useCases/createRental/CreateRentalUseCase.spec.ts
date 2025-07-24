import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@errors/AppError"
import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
    const dayAdd24Hour = dayjs().add(1, "day").toDate()
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
    })

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hour,
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })
    it("Should not allow a user to start a new rental while one is in progress", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hour,
            })

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "212121",
                expected_return_date: dayAdd24Hour,
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it("Should not allow a car to be rented if it is already in use", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hour,
            })

            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "121212",
                expected_return_date: dayAdd24Hour,
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it("Should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})


