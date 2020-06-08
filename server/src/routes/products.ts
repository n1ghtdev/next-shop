import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product';

const router = Router();

router.get('/', async (req: Request, res: Response, next: Function) => {
  try {
    const products = await ProductService.findAll();
    res.json(products).status(200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    const product = await ProductService.find(req.params.id);
    res.json(product).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: Function) => {
  try {
    const product = await ProductService.add(req.body);
    res.json(product).status(200);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    const product = await ProductService.update({
      id: req.params.id,
      ...req.body,
    });
    res.json(product).status(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    const isDeleted = await ProductService.delete(req.params.id);
    res.json({ id: req.params.id, status: isDeleted }).status(200);
  } catch (error) {
    next(error);
  }
});

export { router as products };
