import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase.js';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) return response.status(400).json({ error: 'File is required' });

    await this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
