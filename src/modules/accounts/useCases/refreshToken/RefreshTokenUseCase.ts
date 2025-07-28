import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import type { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import type { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
    sub: string
    email: string
}

interface ITokenResponse {
    token: string,
    refresh_token: string,
}
@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) { }
    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
        const user_id = sub

        const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(user_id, token)
        if (!userToken) {
            throw new AppError("Refresh Token does not exists")
        }

        await this.userTokenRepository.deleteById(userToken.id)

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })
        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)
        await this.userTokenRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        })

        return { refresh_token, token: newToken }

    }

}

export { RefreshTokenUseCase }
