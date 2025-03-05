import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase.js';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    if (!file) return response.status(400).json({ error: 'File is required' });

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
