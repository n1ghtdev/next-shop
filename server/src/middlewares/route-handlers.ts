import { Request, Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export const notFound = (req: Request, res: Response, next: Function) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: Function
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: isProd ? ' ' : error.stack,
  });
};
