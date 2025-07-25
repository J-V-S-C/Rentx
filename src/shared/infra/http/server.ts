import { app } from '@shared/infra/http/app';
import { AppDataSource } from '../typeorm';
import { AppError } from '@errors/AppError';

AppDataSource.initialize().then(() => {
    console.log('Data source initialized')
    app.listen(3333, () => { console.log('Server is running, port:3333') });
}).catch((err) => {
    console.log('Data source error: ', err)
    throw new AppError('Data source error')
});
