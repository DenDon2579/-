import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import UserService from '../../services/UserService';

export default async (req: Request, res: Response) => {
  const isDeleted = await UserService.deleteById(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
