import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import BlogService from '../../services/BlogService';

export default async (req: Request, res: Response) => {
  const result = await BlogService.updateById(req.params.id, req.body);
  if (result) {
    res.status(HTTP_CODES.NO_CONTENT).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
