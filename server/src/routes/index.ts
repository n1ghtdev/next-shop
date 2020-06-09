import { Router } from 'express';
import { products } from './products';
import { categories } from './categories';

const routes = Router();

routes.use('/products', products);
routes.use('/categories', categories);

export { routes };
