import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES, SETTINGS } from '../../settings';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response) => {
  const userId = await UserService.checkCredentials(
    req.body.loginOrEmail,
    req.body.password
  );

  if (userId) {
    const token = jwt.sign({ userId }, SETTINGS.SECRET, { expiresIn: '10h' });
    res.status(HTTP_CODES.OK).json({ accessToken: token });
  } else {
    res.sendStatus(HTTP_CODES.UNAUTHORIZED);
  }
};
