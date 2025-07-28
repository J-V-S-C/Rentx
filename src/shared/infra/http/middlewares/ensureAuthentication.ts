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

    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_token,
        ) as IPayload;

        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError('Invalid token!', 401);
    }

    return null;
}
