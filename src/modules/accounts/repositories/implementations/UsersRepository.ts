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
    id,
    avatar,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    if (user) return user;
    return null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}

export { UsersRepository };
