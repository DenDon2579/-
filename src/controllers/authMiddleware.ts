import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const base64token = req.headers.authorization?.split(' ')[1];
  if (base64token) {
    const [login, password] = Buffer.from(base64token, 'base64')
      .toString()
      .split(':');
    if (login === 'admin' && password === 'qwerty') {
      next();
      return;
    }
  }
  res.sendStatus(401);
};
