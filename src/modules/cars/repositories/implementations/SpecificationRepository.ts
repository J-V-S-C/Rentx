import { Repository } from 'typeorm';
import { ISpecificationRepository } from '../ISpecificationRepository';
import { Specification } from '@modules/cars/entities/Specification';
import { AppDataSource } from '@database/index';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

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

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOneBy({ name });
    return specification ?? undefined;
  }
}

export { SpecificationRepository };
