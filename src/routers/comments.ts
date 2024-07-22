import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { commentInputValidator } from '../validators/comments';
import updateCommentController from '../controllers/comments/updateCommentController';
import getCommentController from '../controllers/comments/getCommentController';
import deleteCommentController from '../controllers/comments/deleteCommentController';

export const commentsRouter = Router();

commentsRouter.put(
  '/:id',
  authMiddleware,
  commentInputValidator,
  updateCommentController
);

commentsRouter.get('/:id', getCommentController);

commentsRouter.delete('/:id', authMiddleware, deleteCommentController);
