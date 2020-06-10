import { Router, Response, Request } from 'express';
import { AuthService } from '../services/auth';
import { signUpValidation, signInValidation } from '../validators/auth';

function sendRefreshToken(res: Response, token: string): void {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/api/v1/auth/refresh-token',
  });
}

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: Function) => {
  const { error } = signUpValidation(req.body);

  if (error) {
    res.status(400);
    next(error);
  }

  try {
    const { user, accessToken, refreshToken } = await AuthService.SignUp(
      req.body
    );
    sendRefreshToken(res, refreshToken);

    return res.send({ user, accessToken }).status(201);
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req: Request, res: Response, next: Function) => {
  const { error } = signInValidation(req.body);

  if (error) {
    res.status(400);
    next(error);
  }

  try {
    const { user, accessToken, refreshToken } = await AuthService.SignIn(
      req.body.email,
      req.body.password
    );
    sendRefreshToken(res, refreshToken);

    return res.send({ user, accessToken }).status(200);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req: Request, res: Response, next: Function) => {
  res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh-token' });
  return res.send(true).status(200);
});

router.post(
  '/refresh-token',
  async (req: Request, res: Response, next: Function) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).send({ message: 'Session Expired' });
    }

    try {
      const {
        user,
        accessToken,
        refreshToken,
      } = await AuthService.updateTokens(token);
      sendRefreshToken(res, refreshToken);

      return res.send({ user, accessToken }).status(200);
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
