
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUserTokenRepository {
    create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null>
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens | null>
}

export type { IUserTokenRepository }

