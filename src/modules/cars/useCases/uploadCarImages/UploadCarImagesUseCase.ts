import { AppError } from '@errors/AppError';
import type { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import type { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('CarImagesRepository')
        private carsImagesRepository: ICarImagesRepository,
    ) { }
    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id)
        if (!carExists) throw new AppError('Car does not exists!');

        images_name.map(async image => {
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
