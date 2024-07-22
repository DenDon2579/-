import { Router } from 'express';
import getAllPostsController from '../controllers/posts/getAllPostsController';
import getPostByIdController from '../controllers/posts/getPostByIdController';
import { postInputValidator } from '../validators/posts';
import createPostController from '../controllers/posts/createPostController';
import updatePostByIdController from '../controllers/posts/updatePostByIdController';
import deletePostByIdController from '../controllers/posts/deletePostByIdController';
import authMiddleware from '../middlewares/authMiddleware';
import { commentInputValidator } from '../validators/comments';
import createPostCommentController from '../controllers/posts/createPostCommentController';
import getCommentsOfPostController from '../controllers/posts/getCommentsOfPostController';

export const postsRouter = Router();

postsRouter.get('/', getAllPostsController);
postsRouter.get('/:id', getPostByIdController);
postsRouter.post('/', authMiddleware, postInputValidator, createPostController);
postsRouter.put(
  '/:id',
  authMiddleware,
  postInputValidator,
  updatePostByIdController
);
postsRouter.delete('/:id', authMiddleware, deletePostByIdController);

postsRouter.post(
  '/:postId/comments',
  authMiddleware,
  commentInputValidator,
  createPostCommentController
);
postsRouter.get('/:postId/comments', getCommentsOfPostController);
