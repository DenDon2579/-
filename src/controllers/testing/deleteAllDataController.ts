import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import { DB, mongoDB } from '../../data/db/db';

export default async (req: Request, res: Response) => {
  await mongoDB.collection('blogs').deleteMany({});
  await mongoDB.collection('posts').deleteMany({});
  res.sendStatus(HTTP_CODES.NO_CONTENT);
};
