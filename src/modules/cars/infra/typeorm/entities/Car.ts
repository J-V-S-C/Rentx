import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  description: string;
  @Column('numeric')
  daily_rate: number;
  @Column('numeric')
  fine_amount: number;
  @Column('varchar')
  license_plate: string;
  @Column('varchar')
  brand: string;
  @Column({ type: 'boolean', default: true })
  available: boolean;
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @Column('varchar')
  category_id: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Car };
