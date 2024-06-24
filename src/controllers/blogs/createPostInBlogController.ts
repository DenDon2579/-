import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import BlogRepository from '../../data/repos/BlogRepository';

export default async (req: Request, res: Response) => {
  if (!(await BlogRepository.findById(req.params.id))) {
    res.sendStatus(404);
    return;
  }
  const result = await PostService.create({
    ...req.body,
    blogId: req.params.id,
  });
  if (result) {
    res.status(HTTP_CODES.CREATED).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
