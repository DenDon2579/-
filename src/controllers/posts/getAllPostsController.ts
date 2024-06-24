import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';

export default async (req: Request, res: Response) => {
  const result = await PostService.getAll();
  res.status(HTTP_CODES.OK).json(result);
};
