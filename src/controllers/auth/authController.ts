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
    const accessToken = jwt.sign({ userId }, SETTINGS.SECRET, {
      expiresIn: '10s',
    });

    const refreshToken = jwt.sign({ userId }, SETTINGS.SECRET, {
      expiresIn: '20s',
    });
    res
      .status(HTTP_CODES.OK)
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
      .json({ accessToken });
  } else {
    res.sendStatus(HTTP_CODES.UNAUTHORIZED);
  }
};
