import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';

export default async (req: Request, res: Response) => {
  const result = await PostQueryRepository.findById(req.params.id);
  if (result) {
    res.status(HTTP_CODES.OK).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
