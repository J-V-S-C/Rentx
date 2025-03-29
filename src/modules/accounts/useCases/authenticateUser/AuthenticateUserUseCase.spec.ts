import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('Should be able to authenticate an user', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '123456',
      email: 'user@test.com',
      password: '1234',
      name: 'User test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an inexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'Testing@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        driver_license: '123456',
        email: 'user@test.com',
        password: '1234',
        name: 'User test Error',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: 'Incorrect password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
