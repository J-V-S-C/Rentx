import { Router } from 'express';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService.js';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository.js';

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get('/', (request, response) => {
  const all = specificationsRepository.list();
  response.json(all);
});

export { specificationsRoutes };
