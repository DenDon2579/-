import { Request, Response } from 'express';
import { ISortParams } from '../../../types/common';
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

export default async (req: Request, res: Response) => {
  let {
    searchLoginTerm,
    searchEmailTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
  } = req.query;

  let sortParams: any;

  if (!sortBy && sortDirection) {
    sortParams = {};
    sortParams.createdAt = sortDirection;
  } else if (sortBy && !sortDirection) {
    sortParams = {};
    sortParams[sortBy as string] = 'desc';
  } else if (sortBy && sortDirection) {
    sortParams = {};
    sortParams[sortBy as string] = sortDirection;
  }

  if (!pageNumber) {
    pageNumber = '1';
  }

  if (!pageSize) {
    pageSize = '10';
  }

  const result = await UserQueryRepository.getAll(
    +pageNumber,
    +pageSize,
    sortParams,
    searchEmailTerm as string,
    searchLoginTerm as string
  );
  res.status(HTTP_CODES.OK).json(result);
};
