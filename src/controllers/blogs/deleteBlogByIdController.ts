import { Request, Response } from 'express';
import BlogRepository from '../../data/repos/BlogRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const isDeleted = await BlogRepository.deleteById(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
