import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SETTINGS } from '../settings';
import UserQueryRepository from '../data/repos/users/UserQueryRepository';
import UserRepository from '../data/repos/users/UserRepository';

export default async (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const payload = jwt.verify(token, SETTINGS.SECRET) as jwt.JwtPayload;
      const userData = await UserRepository.findById(payload.userId);
      if (userData?.emailConfirmation) throw Error();

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
