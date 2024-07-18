import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import { ISortParams } from '../../../types/common';
import BlogRepository from '../../data/repos/blogs/BlogRepository';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';
import BlogQueryRepository from '../../data/repos/blogs/BlogQueryRepository';

interface IQuery {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  const { sortBy, sortDirection, pageNumber, pageSize } = req.query;

  if (!(await BlogQueryRepository.findById(req.params.id))) {
    res.sendStatus(404);
    return;
  }

  let sortParams: ISortParams | undefined;

  if (!sortBy && sortDirection) {
    sortParams = {};
    sortParams.createdAt = sortDirection;
  } else if (sortBy && !sortDirection) {
    sortParams = {};
    sortParams[sortBy] = 'desc';
  } else if (sortBy && sortDirection) {
    sortParams = {};
    sortParams[sortBy] = sortDirection;
  }

  const result = await PostQueryRepository.getAll(
    +pageNumber,
    +pageSize,
    sortParams,
    req.params.id
  );

  res.status(HTTP_CODES.OK).json(result);
};
