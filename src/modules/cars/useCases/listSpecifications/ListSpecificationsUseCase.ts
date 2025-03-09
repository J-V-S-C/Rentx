import { Specification } from '../../entities/Specification.js';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository.js';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}
  execute(): Specification[] {
    const specifications = this.specificationsRepository.list() || [];
    return specifications;
  }
}

export { ListSpecificationsUseCase };
