import { ICreateUsersDTO } from '../dtos/ICreateUserDTO.js';
import { User } from '../entities/User.js';

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export { IUsersRepository };
