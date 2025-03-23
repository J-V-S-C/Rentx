import { Category } from '../entities/category.js';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | null>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
