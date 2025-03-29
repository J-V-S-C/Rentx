import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import type { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) throw new AppError('User already exists', 409);
    const passwordHash = await hash(password, 7);
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
