import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";
import { AppDataSource } from "@shared/infra/typeorm";

class UserTokenRepository implements IUserTokenRepository {
    private repository: Repository<UserTokens>
    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens)
    }
    async create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
        const user_token = this.repository.create({
            user_id,
            refresh_token,
            expires_date
        })
        await this.repository.save(user_token)
        return user_token
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
        const userToken = await this.repository.findOne({
            where: { user_id, refresh_token }
        })
        return userToken
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
        const userToken = await this.repository.findOne({
            where: { refresh_token }
        })
        return userToken
    }
}

export { UserTokenRepository };
