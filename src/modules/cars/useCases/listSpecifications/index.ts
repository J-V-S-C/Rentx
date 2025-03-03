import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository.js';
import { ListSpecificationsController } from './ListSpecificationsController.js';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase.js';

const specificationsRepository = SpecificationRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository,
);
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase,
);

export { listSpecificationsController };
