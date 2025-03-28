import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
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
      'be13222e3f702928fc59522dad39e0a4',
    ) as IPayload;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists', 401);
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
