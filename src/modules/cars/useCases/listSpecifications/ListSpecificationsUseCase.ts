import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification.js';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository.js';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}
  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
