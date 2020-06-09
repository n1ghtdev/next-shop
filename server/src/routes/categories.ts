import { Router, Request, Response } from 'express';
import { CategoryService } from '../services/category';

const router = Router();

router.get('/', async (req: Request, res: Response, next: Function) => {
  try {
    const categories = await CategoryService.findAll();
    res.json(categories).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: Function) => {
  try {
    const category = await CategoryService.add(req.body);
    res.json(category).status(200);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    const category = await CategoryService.update({
      id: req.params.id,
      ...req.body,
    });
    res.json(category).status(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    const isDeleted = await CategoryService.delete(req.params.id);
    res.json({ id: req.params.id, status: isDeleted }).status(200);
  } catch (error) {
    next(error);
  }
});

export { router as categories };
