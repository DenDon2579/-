import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SETTINGS } from '../settings';

export default async (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const payload = jwt.verify(token, SETTINGS.SECRET) as jwt.JwtPayload;
      req.userId = payload.userId;
      next();
      return;
    } catch (e) {
      res.sendStatus(401);
      return;
    }
  }
  res.sendStatus(401);
};
