import { Router } from 'express';
import createBlogController from '../controllers/blogs/createBlogController';
import { blogInputValidator } from '../validators/blogs';
import getAllBlogsController from '../controllers/blogs/getAllBlogsController';
import getBlogByIdController from '../controllers/blogs/getBlogByIdController';
import updateBlogByIdController from '../controllers/blogs/updateBlogByIdController';
import deleteBlogByIdController from '../controllers/blogs/deleteBlogByIdController';

export const blogsRouter = Router();

blogsRouter.get('/', getAllBlogsController);
blogsRouter.get('/:id', getBlogByIdController);
blogsRouter.post('/', blogInputValidator, createBlogController);
blogsRouter.put('/:id', blogInputValidator, updateBlogByIdController);
blogsRouter.delete('/:id', deleteBlogByIdController);
