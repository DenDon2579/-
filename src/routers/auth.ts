import { Router } from 'express';
import registerController from '../controllers/auth/registerController';
import { userEmailValidator, userInputValidator } from '../validators/users';
import authController from '../controllers/auth/authController';
import bearerAuthMiddleware from '../middlewares/bearerAuthMiddleware';
import userInfoController from '../controllers/auth/userInfoController';
import confirmEmailController from '../controllers/auth/confirmEmailController';
import resendConfirmationEmailController from '../controllers/auth/resendConfirmationEmailController';
import refreshTokenAuthMiddleware from '../middlewares/refreshTokenAuthMiddleware';
import refreshTokenController from '../controllers/auth/refreshTokenController';
import logoutController from '../controllers/auth/logoutController';

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

authRouter.post('/logout', refreshTokenAuthMiddleware, logoutController);
authRouter.post(
  '/refresh-token',
  refreshTokenAuthMiddleware,
  refreshTokenController
);
