import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }
}

export { CategoriesRepositoryInMemory };
