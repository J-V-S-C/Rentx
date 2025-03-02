import express from 'express';
import { categoriesRoutes } from './routes/categories.routes.js';
import { specificationsRoutes } from './routes/specification.routes.js';

const app = express();
app.use(express.json());
app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

app.listen(3333, () => console.log('Server is running'));
