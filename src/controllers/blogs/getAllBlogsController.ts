import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import BlogService from '../../services/BlogService';

export default async (req: Request, res: Response) => {
  const result = await BlogService.getAll();
  res.status(HTTP_CODES.OK).json(result);
};
