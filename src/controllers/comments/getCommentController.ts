import { Request, Response } from 'express';
import CommentQueryRepository from '../../data/repos/comments/CommentQueryRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const commentData = await CommentQueryRepository.findById(req.params.id);

  if (commentData) {
    res.status(HTTP_CODES.OK).json(commentData);
  } else {
    res.sendStatus(HTTP_CODES.NOT_FOUND);
  }
};
