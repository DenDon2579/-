import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const result = await UserService.checkCredentials(
    req.body.loginOrEmail,
    req.body.password
  );

  if (result) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
  } else {
    res.sendStatus(HTTP_CODES.UNAUTHORIZED);
  }
};
