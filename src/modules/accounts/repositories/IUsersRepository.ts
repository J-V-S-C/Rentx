import { ICreateUsersDTO } from '../dtos/ICreateUserDTO.js';

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository };
