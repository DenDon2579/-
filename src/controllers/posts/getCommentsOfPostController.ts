import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import { IPaginatorParams, ISortParams } from '../../types/common';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';
import CommentQueryRepository from '../../data/repos/comments/CommentQueryRepository';

interface IQuery {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  const isPostExist = !!(await PostQueryRepository.findById(req.params.postId));
  if (!isPostExist) {
    res.sendStatus(HTTP_CODES.NOT_FOUND);
    return;
  }

  const { sortBy, sortDirection, pageNumber, pageSize } = req.query;

  const sortParams: ISortParams = {};

  sortParams[sortBy || 'createdAt'] = sortDirection || 'desc';

  let paginatorParams: IPaginatorParams = {
    pageNumber: +pageNumber || 1,
    pageSize: +pageSize || 10,
    sortParams: sortParams,
  };

  const result = await CommentQueryRepository.getAllCommentsOfPost(
    paginatorParams,
    req.params.postId
  );

  if (result) {
    res.status(HTTP_CODES.OK).json(result);
  } else {
    res.sendStatus(HTTP_CODES.NOT_FOUND);
  }
};
