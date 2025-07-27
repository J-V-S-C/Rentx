import { AppError } from "@errors/AppError";
import { v4 as uuidv4 } from 'uuid'
import type { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import type { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { inject, injectable } from "tsyringe";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }
    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User does not exists!")
        }

        const token = uuidv4()
        const expires_date = this.dateProvider.addHours(3)

        await this.userTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

    }

}

export { SendForgotPasswordMailUseCase }
