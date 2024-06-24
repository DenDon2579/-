import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import BlogService from '../../services/BlogService';
import { ISortParams } from '../../../types/common';

interface IQuery {
  searchNameTerm: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  let { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } =
    req.query;

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

  const result = await BlogService.getAll(
    +pageNumber,
    +pageSize,
    sortParams,
    searchNameTerm
  );
  res.status(HTTP_CODES.OK).json(result);
};
