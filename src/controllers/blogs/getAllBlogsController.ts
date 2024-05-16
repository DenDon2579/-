import { Request, Response } from 'express';
import BlogRepository from '../../data/repos/BlogRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const result = await BlogRepository.getAll();
  res.status(HTTP_CODES.OK).json(result);
};
