import { AppDataSource } from '@database/index';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { Repository } from 'typeorm';
import { IUsersRepository } from '../IUsersRepository';

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
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });
    return user ?? undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { id } });
    return user ?? undefined;
  }
}

export { UsersRepository };
