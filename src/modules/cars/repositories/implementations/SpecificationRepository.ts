import { Repository } from 'typeorm';
import { Specification } from '../../entities/Specification.js';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository.js';
import { AppDataSource } from '../../../../database/index.js';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });
    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOneBy({ name });
    if (specification) return specification;
    return null;
  }
}

export { SpecificationRepository };
