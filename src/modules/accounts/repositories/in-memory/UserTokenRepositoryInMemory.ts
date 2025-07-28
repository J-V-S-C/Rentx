import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokenRepository } from "../IUserTokenRepository";
import { AppError } from "@errors/AppError";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
    userTokens: UserTokens[] = []

    async create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })

        this.userTokens.push(userToken)
        return userToken

    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
        const userToken = this.userTokens.find(ut => ut.refresh_token === refresh_token)
        return userToken || null
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
        const userToken = this.userTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token)
        return userToken || null
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(ut => ut.id === id)
        if (!userToken) {
            throw new AppError("Token does not exists")
        }
        this.userTokens.splice(this.userTokens.indexOf(userToken))
    }


}

export { UserTokenRepositoryInMemory }
