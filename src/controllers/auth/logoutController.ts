import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES, SETTINGS } from '../../settings';

export default async (req: Request, res: Response) => {
  await UserService.setRefreshToken(req.userId!, null);
  res.sendStatus(HTTP_CODES.NO_CONTENT);
};
