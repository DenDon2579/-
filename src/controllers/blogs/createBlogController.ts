import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import BlogRepository from '../../data/repos/BlogRepository';
import { HTTP_CODES } from '../../settings';

export default (req: Request, res: Response) => {
  const result = BlogRepository.create(req.body);
  if (result) {
    res.status(HTTP_CODES.OK).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
