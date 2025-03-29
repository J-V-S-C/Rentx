import { DataSource } from 'typeorm';
import 'dotenv/config';
import { AppError } from '@errors/AppError';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

if (typeof process.env.DB_PORT === 'undefined') {
  throw new AppError('Invalid port type');
}
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Specification, User],
  migrations: ['./src/database/migrations/*.ts'],
});
