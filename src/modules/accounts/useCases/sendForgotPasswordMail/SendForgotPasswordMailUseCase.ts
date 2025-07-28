import { AppError } from "@errors/AppError";
import { v4 as uuidv4 } from 'uuid'
import type { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import type { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { inject, injectable } from "tsyringe";
import type { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import type { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";
import { config } from "dotenv";
config();

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }
    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email)

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "ForgotPassword.hbs")
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

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        }

        await this.mailProvider.sendMail(
            email, "Password recuperation", variables, templatePath)
    }
}

export { SendForgotPasswordMailUseCase }
