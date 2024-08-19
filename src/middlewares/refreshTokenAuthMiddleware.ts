import { NextFunction, Request, Response } from 'express';
import { HTTP_CODES, SETTINGS } from '../settings';
import UserService from '../services/UserService';

export default async (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.refreshToken;
  const userId = await UserService.validateRefreshToken(token);

  if (userId) {
    req.userId = userId;
    next();
    return;
  }

  res.sendStatus(HTTP_CODES.UNAUTHORIZED);
};
