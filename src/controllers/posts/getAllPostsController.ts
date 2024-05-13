import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostRepository from '../../data/repos/PostRepository';

export default (req: Request, res: Response) => {
  const result = PostRepository.getAll();
  res.status(HTTP_CODES.OK).json(result);
};
