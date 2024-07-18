import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import BlogService from '../../services/BlogService';
import BlogQueryRepository from '../../data/repos/blogs/BlogQueryRepository';

export default async (req: Request, res: Response) => {
  const createdBlogId = await BlogService.create(req.body);
  if (createdBlogId) {
    const blogData = await BlogQueryRepository.findById(createdBlogId);
    res.status(HTTP_CODES.CREATED).json(blogData);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
