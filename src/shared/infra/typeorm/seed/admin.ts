import { AppDataSource } from '..';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

async function create() {
    await AppDataSource.initialize();


    const id = uuidv4();
    const password = await hash(process.env.ADMIN_PASSWORD!, 8);

    const userRepo = AppDataSource.getRepository(User);

    await userRepo.query(
        `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, 'admin', 'admin@rentx.com.br', password, true, new Date(), '3821jde'],
    );

    console.log('User admin created');
    await AppDataSource.destroy();
}

create().catch(err => {
    console.error('Erro ao criar admin:', err);
});
