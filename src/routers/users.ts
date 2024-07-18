import { Router } from 'express';
import getAllUsersController from '../controllers/users/getAllUsersController';
import authMiddleware from '../controllers/authMiddleware';
import { userInputValidator } from '../validators/users';
import createUserController from '../controllers/users/createUserController';
import deleteUserController from '../controllers/users/deleteUserController';
export const usersRouter = Router();

usersRouter.get('/', authMiddleware, getAllUsersController);
usersRouter.post('/', authMiddleware, userInputValidator, createUserController);
usersRouter.delete('/:id', authMiddleware, deleteUserController);
