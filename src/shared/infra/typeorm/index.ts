import { config } from 'dotenv';

// Escolhe o .env correto com base no ambiente
const envPath =
    process.env.NODE_ENV === 'test'
        ? '.env.test'
        : process.env.NODE_ENV === 'docker'
            ? '.env.docker'
            : '.env';

config({ path: envPath });

import { DataSource } from 'typeorm';
import { AppError } from '@errors/AppError';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

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
    entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});
