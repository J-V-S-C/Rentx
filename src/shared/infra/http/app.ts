import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { readFile } from 'fs/promises';
import swaggerUI from 'swagger-ui-express';
import '@shared/container';
import { router } from '@shared/infra/http/routes';
import { AppError } from '@errors/AppError';
import { AppDataSource } from '@shared/infra/typeorm/index';
import { getSwaggerPath } from '@utils/getSwaggerPath';

async function startServer(): Promise<void> {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('🛑 Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', err => {
    console.error('🔥 Uncaught Exception:', err);
  });
  const swaggerFile = JSON.parse(await readFile(getSwaggerPath(), 'utf-8'));

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
