import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return;
  const [authType, credentials] = req.headers.authorization?.split(' ');
  if (authType === 'Basic' && credentials) {
    const [login, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');
    if (login === 'admin' && password === 'qwerty') {
      next();
      return;
    }
  }
  res.sendStatus(401);
};
