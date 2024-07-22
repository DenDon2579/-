import { Request, Response } from 'express';
import CommentQueryRepository from '../../data/repos/comments/CommentQueryRepository';
import { HTTP_CODES } from '../../settings';
import CommentService from '../../services/CommentService';

export default async (req: Request, res: Response) => {
  const commentData = await CommentQueryRepository.findById(req.params.id);

  if (!commentData) {
    res.sendStatus(HTTP_CODES.NOT_FOUND);
    return;
  }

  if (commentData.commentatorInfo.userId !== req.userId) {
    res.sendStatus(HTTP_CODES.FORBIDDEN);
    return;
  }

  const isUpdated = await CommentService.updateById(
    req.params.id,
    req.body.content
  );
  if (isUpdated) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
