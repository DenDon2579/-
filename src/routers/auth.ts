import { Router } from 'express';
import registerController from '../controllers/auth/registerController';
import { userEmailValidator, userInputValidator } from '../validators/users';
import authController from '../controllers/auth/authController';
import bearerAuthMiddleware from '../middlewares/bearerAuthMiddleware';
import userInfoController from '../controllers/auth/userInfoController';
import confirmEmailController from '../controllers/auth/confirmEmailController';
import resendConfirmationEmailController from '../controllers/auth/resendConfirmationEmailController';

export const authRouter = Router();

authRouter.post('/registration', userInputValidator, registerController);
authRouter.post('/registration-confirmation', confirmEmailController);
authRouter.post(
  '/registration-email-resending',
  userEmailValidator,
  resendConfirmationEmailController
);
authRouter.post('/login', authController);
authRouter.get('/me', bearerAuthMiddleware, userInfoController);
