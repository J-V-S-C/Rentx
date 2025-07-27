import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}
export async function ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<null> {
    const authHeader = request.headers.authorization;
    const userTokenRepository = new UserTokenRepository()

    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token,
        ) as IPayload;
        const usersRepository = new UsersRepository();

        const user = await userTokenRepository.findByUserIdAndRefreshToken(user_id, token);
        if (!user) {
            throw new AppError('Email or password incorrect', 401);
        }

        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError('Invalid token!', 401);
    }

    return null;
}
