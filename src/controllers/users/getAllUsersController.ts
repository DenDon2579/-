import { Request, Response } from 'express';
import { IPaginatorParams, ISortParams } from '../../types/common';
import UserRepository from '../../data/repos/users/UserRepository';
import { HTTP_CODES } from '../../settings';
import UserQueryRepository from '../../data/repos/users/UserQueryRepository';

interface IQuery {
  searchLoginTerm: string | undefined;
  searchEmailTerm: string | undefined;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  let {
    searchLoginTerm,
    searchEmailTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
  } = req.query;

  const sortParams: ISortParams = {};

  sortParams[sortBy || 'createdAt'] = sortDirection || 'desc';

  let paginatorParams: IPaginatorParams = {
    pageNumber: +pageNumber || 1,
    pageSize: +pageSize || 10,
    sortParams: sortParams,
  };

  const result = await UserQueryRepository.getAll(
    paginatorParams,
    searchEmailTerm as string,
    searchLoginTerm as string
  );
  res.status(HTTP_CODES.OK).json(result);
};
