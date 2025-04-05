import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { CarImage } from '../entities/CarImage';
import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      image_name,
      car_id,
    });

    await this.repository.save(carImage);
    return carImage;
  }
}

export { CarImagesRepository };
