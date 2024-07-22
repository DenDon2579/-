import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { commentInputValidator } from '../validators/comments';
import updateCommentController from '../controllers/comments/updateCommentController';
import getCommentController from '../controllers/comments/getCommentController';
import deleteCommentController from '../controllers/comments/deleteCommentController';
import bearerAuthMiddleware from '../middlewares/bearerAuthMiddleware';

export const commentsRouter = Router();

commentsRouter.put(
  '/:id',
  bearerAuthMiddleware,
  commentInputValidator,
  updateCommentController
);

commentsRouter.get('/:id', getCommentController);

commentsRouter.delete('/:id', bearerAuthMiddleware, deleteCommentController);
