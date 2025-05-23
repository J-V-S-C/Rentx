import { Repository } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { AppDataSource } from '@shared/infra/typeorm/index';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOneBy({ name });
    return category ?? undefined;
  }
}
export { CategoriesRepository };
