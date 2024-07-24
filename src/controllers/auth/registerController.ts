import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import UserQueryRepository from '../../data/repos/users/UserQueryRepository';
import { HTTP_CODES } from '../../settings';

export default async (req: Request, res: Response) => {
  console.log('VLAD');
  const registrationResult = await UserService.register(req.body);
  console.log(registrationResult);
  if (!registrationResult) {
    res.sendStatus(HTTP_CODES.BAD_REQUEST);
    return;
  }
  const [createdUserId, error] = registrationResult;
  if (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      errorsMessages: [error],
    });
    return;
  }

  if (createdUserId) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }

  res.sendStatus(HTTP_CODES.BAD_REQUEST);
};
