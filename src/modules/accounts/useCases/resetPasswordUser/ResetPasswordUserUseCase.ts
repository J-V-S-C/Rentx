import { AppError } from "@errors/AppError";
import type { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import type { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
    password: string,
    token: string,
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByRefreshToken(token)
        if (!userToken) {
            throw new AppError("Token invalid!")
        }

        const expired = this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())
        if (expired) {
            throw new AppError("Token expired!")
        }

        const user = await this.usersRepository.findById(userToken.user_id)
        if (!user) {
            throw new AppError("User does not exist!")
        }
        user.password = await hash(password, 8)

        await this.usersRepository.create(user)

        await this.userTokenRepository.deleteById(userToken.id)
    }

}

export { ResetPasswordUserUseCase }
