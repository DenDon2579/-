import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';

export default async (req: Request, res: Response) => {
  const isDeleted = await PostService.deleteById(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
