import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository.js';
import { CreateSpecificationController } from './CreateSpecificationController.js';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase.js';

const specificationRepository = SpecificationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
