import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: Function) => {
  try {
    res.json({ data: null }).status(200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    res.json({ id: req.params.id }).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: Function) => {
  try {
    res.json({ status: 'added' }).status(200);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    res.json({ id: req.params.id, status: 'updated' }).status(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: Function) => {
  try {
    res.json({ id: req.params.id, status: 'deleted' }).status(200);
  } catch (error) {
    next(error);
  }
});

export { router as products };
