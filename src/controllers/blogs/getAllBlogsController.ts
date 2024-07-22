import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import { IPaginatorParams, ISortParams } from '../../types/common';
import BlogQueryRepository from '../../data/repos/blogs/BlogQueryRepository';

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

  const sortParams: ISortParams = {};

  sortParams[sortBy || 'createdAt'] = sortDirection || 'desc';

  let paginatorParams: IPaginatorParams = {
    pageNumber: +pageNumber || 1,
    pageSize: +pageSize || 10,
    sortParams: sortParams,
  };

  const result = await BlogQueryRepository.getAll(
    paginatorParams,
    searchNameTerm
  );
  res.status(HTTP_CODES.OK).json(result);
};
