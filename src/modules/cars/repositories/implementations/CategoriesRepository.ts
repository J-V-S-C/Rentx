import { Category } from '@modules/cars/entities/Category';
import { Repository } from 'typeorm';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { AppDataSource } from '@database/index';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

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
