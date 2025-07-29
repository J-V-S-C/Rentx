import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase"

let listRentalsByUserUseCase: ListRentalsByUserUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("List Rentals By User", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepositoryInMemory)
    })
    it("Should be able to list all rentals by user", async () => {
        const rental1 = await rentalsRepositoryInMemory.create({
            user_id: "54321",
            car_id: "54321",
            expected_return_date: new Date
        })
        const rental2 = await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "54321",
            expected_return_date: new Date
        })

        const rentals = await listRentalsByUserUseCase.execute(rental1.user_id)

        expect(rentals).toEqual([rental1])
        expect(rentals).not.toContain(rental2)
    })
})
