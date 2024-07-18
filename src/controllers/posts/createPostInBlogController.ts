import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import BlogQueryRepository from '../../data/repos/blogs/BlogQueryRepository';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';

export default async (req: Request, res: Response) => {
  if (!(await BlogQueryRepository.findById(req.params.id))) {
    res.sendStatus(404);
    return;
  }
  const createdPostId = await PostService.create({
    ...req.body,
    blogId: req.params.id,
  });
  if (createdPostId) {
    const postData = PostQueryRepository.findById(createdPostId);
    res.status(HTTP_CODES.CREATED).json(postData);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
