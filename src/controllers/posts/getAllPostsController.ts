import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import { ISortParams } from '../../../types/common';
import PostQueryRepository from '../../data/repos/posts/PostQueryRepository';

interface IQuery {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  const { sortBy, sortDirection, pageNumber, pageSize } = req.query;
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
    sortParams
  );
  res.status(HTTP_CODES.OK).json(result);
};
