import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import BlogRepository from '../../data/repos/BlogRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const result = await BlogRepository.create(req.body);
  if (result) {
    res.status(HTTP_CODES.CREATED).json(result);
    return;
  }
  res.sendStatus(HTTP_CODES.NOT_FOUND);
};
