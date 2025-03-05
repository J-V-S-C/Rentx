import express from 'express';
import { router } from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import { readFile } from 'fs/promises';

async function startServer(): Promise<void> {
  const swaggerFile = JSON.parse(
    await readFile(new URL('./swagger.json', import.meta.url), 'utf-8'),
  );

  const app = express();

  app.use(express.json());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use(router);

  app.listen(3333, () => console.log('Server is running'));
}

export { startServer };
