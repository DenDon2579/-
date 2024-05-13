import { Router } from 'express';
import createBlogController from '../controllers/blogs/createBlogController';
import { blogInputValidator } from '../validators/blogs';
import getAllBlogsController from '../controllers/blogs/getAllBlogsController';
import getBlogByIdController from '../controllers/blogs/getBlogByIdController';
import updateBlogByIdController from '../controllers/blogs/updateBlogByIdController';
import deleteBlogByIdController from '../controllers/blogs/deleteBlogByIdController';
import authMiddleware from '../controllers/authMiddleware';

export const blogsRouter = Router();

blogsRouter.get('/', getAllBlogsController);
blogsRouter.get('/:id', getBlogByIdController);
blogsRouter.post('/', authMiddleware, blogInputValidator, createBlogController);
blogsRouter.put(
  '/:id',
  authMiddleware,
  blogInputValidator,
  updateBlogByIdController
);
blogsRouter.delete('/:id', authMiddleware, deleteBlogByIdController);
