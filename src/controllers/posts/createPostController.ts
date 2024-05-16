import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostRepository from '../../data/repos/PostRepository';

export default async (req: Request, res: Response) => {
  const result = await PostRepository.create(req.body);
  if (result) {
    res.status(HTTP_CODES.CREATED).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
