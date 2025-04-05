import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('car_images')
class CarImage {
  @PrimaryColumn('uuid')
  id: string;
  @Column('varchar')
  car_id: string;
  @Column('varchar')
  image_name: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { CarImage };
