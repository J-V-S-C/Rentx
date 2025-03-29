import { Specification } from '@modules/cars/entities/Specification';
import type { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';

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
