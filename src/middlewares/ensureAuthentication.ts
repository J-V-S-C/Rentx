import { NextFunction, Request, Response } from 'express';

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<null> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split('');
  return null;
}
