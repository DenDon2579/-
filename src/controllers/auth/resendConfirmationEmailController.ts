import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import { HTTP_CODES } from '../../settings';
export default async (req: Request, res: Response) => {
  const result = await UserService.resendConfirmationEmail(req.body.email);
  if (result) {
    res.sendStatus(HTTP_CODES.NO_CONTENT);
    return;
  }
  res.status(HTTP_CODES.BAD_REQUEST).json({
    errorsMessages: [
      {
        message: 'email error',
        field: 'email',
      },
    ],
  });
};
