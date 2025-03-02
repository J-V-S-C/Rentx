import { Category } from '../model/category.js';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository.js';

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category | null {
    console.log(name);
    return null;
  }
  list(): Category[] | null {
    console.log('Hello');
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}

export { PostgresCategoriesRepository };
