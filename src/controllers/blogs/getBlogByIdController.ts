import { Request, Response } from 'express';
import BlogRepository from '../../data/repos/BlogRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const result = await BlogRepository.findById(req.params.id);
  if (result) {
    res.status(HTTP_CODES.OK).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
