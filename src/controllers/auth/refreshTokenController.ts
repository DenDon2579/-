import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES, SETTINGS } from '../../settings';

export default async (req: Request, res: Response) => {
  const accessToken = jwt.sign({ userId: req.userId }, SETTINGS.SECRET, {
    expiresIn: '10s',
  });

  const refreshToken = jwt.sign({ userId: req.userId }, SETTINGS.SECRET, {
    expiresIn: '20s',
  });

  await UserService.setRefreshToken(req.userId!, refreshToken);

  res
    .status(HTTP_CODES.OK)
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
    .json({ accessToken });
};
