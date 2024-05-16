import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostRepository from '../../data/repos/PostRepository';

export default async (req: Request, res: Response) => {
  const result = await PostRepository.getAll();
  res.status(HTTP_CODES.OK).json(result);
};
