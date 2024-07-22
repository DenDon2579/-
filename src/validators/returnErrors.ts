import { IErrorResult, IFieldError } from '../types/error';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_CODES } from '../settings';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const errorsMessages: IFieldError[] = errors
    .array({ onlyFirstError: true })
    .map((error) => ({
      //@ts-ignore
      field: error.path,
      message: error.msg,
    }));

  const errorResult: IErrorResult = { errorsMessages };

  res.status(HTTP_CODES.BAD_REQUEST).json(errorResult);
};
