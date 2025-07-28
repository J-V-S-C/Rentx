import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryColumn('uuid')
    id: string;
    @Column('varchar')
    name: string;
    @Column('varchar')
    email: string;
    @Column('varchar')
    password: string;
    @Column('varchar')
    driver_license: string;
    @Column('boolean')
    is_admin: boolean;
    @Column('varchar')
    avatar: string;
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { User };
