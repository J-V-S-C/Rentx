import { In, Repository } from 'typeorm';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { AppDataSource } from '@shared/infra/typeorm/index';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });
    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOneBy({ name });
    return specification ?? undefined;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.repository.findBy({ id: In(ids) });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export { SpecificationRepository };
