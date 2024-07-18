import { Request, Response } from 'express';
import { HTTP_CODES } from '../../settings';
import { mongoDB } from '../../data/db/db';

export default async (req: Request, res: Response) => {
  await mongoDB.collection('blogs').deleteMany({});
  await mongoDB.collection('posts').deleteMany({});
  await mongoDB.collection('users').deleteMany({});
  res.sendStatus(HTTP_CODES.NO_CONTENT);
};
