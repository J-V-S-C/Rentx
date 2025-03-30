import type { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  daily_number: number;
  fine_amount: number;
  license_plate: string;
  brand: string;
  category_id: string;
}
@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({
    name,
    description,
    daily_number,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<void> {
    this.carsRepository.create({
      name,
      description,
      daily_number,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}

export { CreateCarUseCase };
