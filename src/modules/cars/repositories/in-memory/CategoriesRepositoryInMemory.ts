import { Category } from '@modules/cars/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';
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
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
