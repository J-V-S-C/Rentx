import { Category } from '../../entities/category.js';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository.js';
import { AppDataSource } from '../../../../database/index.js';
import { Repository } from 'typeorm';

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

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}
export { CategoriesRepository };
