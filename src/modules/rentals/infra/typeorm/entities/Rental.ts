import { CreateDateColumn, PrimaryColumn } from "typeorm";
import { UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";
import { Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity("rentals")
class Rental {
    @PrimaryColumn('uuid')
    id: string;
    @Column('varchar')
    car_id: string;
    @Column('varchar')
    user_id: string;
    @Column('numeric')
    total: number;
    @Column({ type: 'timestamp' })
    start_date: Date;
    @Column({ type: 'timestamp' })
    end_date: Date;
    @Column({ type: 'timestamp' })
    expected_return_date: Date;
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Rental }
