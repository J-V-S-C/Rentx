import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;
    constructor() {
        this.repository = AppDataSource.getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
        return await this.repository
            .createQueryBuilder("r")
            .where("r.car_id = :car_id", { car_id })
            .andWhere("r.end_date IS NULL")
            .getOne();
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
        return await this.repository
            .createQueryBuilder("r")
            .where("r.user_id = :user_id", { user_id })
            .andWhere("r.end_date IS NULL")
            .getOne();
    }
    async create({ total, car_id, user_id, expected_return_date, id, end_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        })
        await this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rental | null> {
        const rental = await this.repository.findOneBy({ id })
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[] | null> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"]
        })
        return rentals
    }

}

export { RentalsRepository }
