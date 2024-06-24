import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import PostService from '../../services/PostService';
import { ISortParams } from '../../../types/common';
import BlogRepository from '../../data/repos/BlogRepository';

interface IQuery {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: string;
  pageSize: string;
}

export default async (req: Request<any, any, any, IQuery>, res: Response) => {
  const { sortBy, sortDirection, pageNumber, pageSize } = req.query;

  if (!(await BlogRepository.findById(req.params.id))) {
    res.sendStatus(404);
    return;
  }

  let sortParams: ISortParams | undefined;

  if (sortBy && sortDirection) {
    sortParams = {};
    sortParams[sortBy] = sortDirection;
  }

  const result = await PostService.getAll(
    +pageNumber,
    +pageSize,
    sortParams,
    req.params.id
  );
  console.log(result);
  res.status(HTTP_CODES.OK).json(result);
};
