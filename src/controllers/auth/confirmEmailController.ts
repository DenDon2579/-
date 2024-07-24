import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES } from '../../settings';
export default async (req: Request, res: Response) => {
  const isConfirmed = await UserService.confirmRegistration(req.body.code);
  if (isConfirmed) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.status(HTTP_CODES.BAD_REQUEST).json({
    errorsMessages: [
      {
        message: 'code error',
        field: 'code',
      },
    ],
  });
};
