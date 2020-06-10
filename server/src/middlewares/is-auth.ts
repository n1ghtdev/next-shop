import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

function getTokenFromHeader(req: Request): string | null {
  const headers = req.headers.authorization;

  if (/(Bearer|Token)/.test(headers && headers.split(' ').shift())) {
    return headers?.split(' ').pop();
  }

  return null;
}

// eslint-disable-next-line consistent-return
export async function isAuth(req: Request, res: Response, next: Function) {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).send({ message: 'Access Denied' });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid Token' });
    next();
  }
}
