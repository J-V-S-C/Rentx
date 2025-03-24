import { Repository } from 'typeorm';
import { ICreateUsersDTO } from '../../dtos/ICreateUserDTO.js';
import { IUsersRepository } from '../IUsersRepository.js';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../../../database/index.js';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    if (user) return user;
    return null;
  }
}

export { UsersRepository };
