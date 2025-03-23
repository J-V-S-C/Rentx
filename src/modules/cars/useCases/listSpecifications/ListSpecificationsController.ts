import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase.js';
import { container } from 'tsyringe';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase,
    );
    const all = await listSpecificationsUseCase.execute();
    return response.json(all);
  }
}
export { ListSpecificationsController };
