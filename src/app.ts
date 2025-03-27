import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { readFile } from 'fs/promises';
import { AppDataSource } from './database';
import './shared/container';
import { AppError } from './errors/AppError';

async function startServer(): Promise<void> {
  const swaggerFile = JSON.parse(
    await readFile(path.resolve(__dirname, 'swagger.json'), 'utf-8'),
  );

  await AppDataSource.initialize();

  const app = express();

  app.use(express.json());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use(router);
  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: `internal server error - ${err.message}`,
      });
    },
  );

  app.listen(3333, () => console.log('Server is running, port:3333'));
}

export { startServer };
