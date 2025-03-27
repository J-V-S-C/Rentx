import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';
import { AppError } from '../../../../errors/AppError';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const { id } = request.user;
    const avatar_file = request.file?.filename;
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    if (!avatar_file) throw new AppError('Avatar file is missing', 400);
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file: avatar_file,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
