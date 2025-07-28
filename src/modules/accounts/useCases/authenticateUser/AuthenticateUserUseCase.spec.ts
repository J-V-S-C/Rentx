import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UserTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: IDateProvider
let userTokenRepositoryInMemory: IUserTokenRepository


describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider()
        userTokenRepositoryInMemory = new UserTokenRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokenRepositoryInMemory,
            dateProvider,
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

    it('Should not be able to authenticate an inexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'Testing@email.com',
                password: '1234',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect", 401))
    });

    it('Should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUsersDTO = {
            driver_license: '123456',
            email: 'user@test.com',
            password: '1234',
            name: 'User test Error',
        };
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: 'Incorrect password',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect", 401))
    });
});
