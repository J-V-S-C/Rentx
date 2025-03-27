import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { deleteFile } from '../../../../utils/file';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User does not exists', 401);

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
//Adicionar coluna avatar na tabela users
//Refatorar usuario com coluna avatar
//configuração upload multer
//Criar regra de negócio de upload
//criar controller
