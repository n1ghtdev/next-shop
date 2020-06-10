import { Router } from 'express';
import { products } from './products';
import { categories } from './categories';
import { auth } from './auth';

const routes = Router();

routes.use('/auth', auth);
routes.use('/products', products);
routes.use('/categories', categories);

export { routes };
