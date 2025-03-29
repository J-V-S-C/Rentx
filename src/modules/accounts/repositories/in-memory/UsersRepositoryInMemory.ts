import { User } from '@modules/accounts/entities/User';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersRepositoryInMemory };
