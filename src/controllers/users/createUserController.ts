import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import UserQueryRepository from '../../data/repos/users/UserQueryRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  const [createdUserId, error] = await UserService.create(req.body);
  if (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      errorsMessages: [error],
    });
    return;
  }

  if (createdUserId) {
    const userData = await UserQueryRepository.findById(
      createdUserId as string
    );

    console.log(userData);

    if (userData) {
      res.status(HTTP_CODES.CREATED).json(userData);
      return;
    }
  }

  res.sendStatus(HTTP_CODES.BAD_REQUEST);
};
