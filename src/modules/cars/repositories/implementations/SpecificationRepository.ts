import { Specification } from '../../model/Specification.js';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository.js';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  list(): Specification[] | null {
    return this.specifications;
  }
  findByName(name: string): Specification | void {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    );

    return specification;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
}

export { SpecificationRepository };
