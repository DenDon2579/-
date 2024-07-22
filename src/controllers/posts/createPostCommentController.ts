import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';
import CommentService from '../../services/CommentService';
import CommentQueryRepository from '../../data/repos/comments/CommentQueryRepository';

export default async (req: Request, res: Response) => {
  const isPostExist = !!PostQueryRepository.findById(req.params.postId);
  if (!isPostExist) {
    res.sendStatus(HTTP_CODES.NOT_FOUND);
    return;
  }

  const createdCommentId = await CommentService.create({
    content: req.body.content,
    authorId: req.userId as string,
    postId: req.params.postId,
  });
  if (createdCommentId) {
    const commentData = await CommentQueryRepository.findById(createdCommentId);
    res.status(HTTP_CODES.CREATED).json(commentData);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
