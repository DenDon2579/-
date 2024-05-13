import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import { DB } from '../../data/db/db';

export default (req: Request, res: Response) => {
  DB.blogs = [];
  DB.posts = [];
};
