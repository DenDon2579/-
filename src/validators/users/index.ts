import { body } from 'express-validator';
import returnErrors from '../returnErrors';

const loginValidator = body('login')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Invalid length')
  .matches('^[a-zA-Z0-9_-]*$')
  .withMessage('Invalid pattern');

const emailValidator = body('email')
  .isString()
  .withMessage('This field is required')
  .matches('^[w-.]+@([w-]+.)+[w-]{2,4}$')
  .withMessage('Invalid pattern');

const passwordValidator = body('password')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage('Invalid length');

const loginOrEmailValidator = body('loginOrEmail')
  .isString()
  .withMessage('This field is required');

export const userInputValidator = [
  loginValidator,
  emailValidator,
  passwordValidator,
  returnErrors,
];

export const userAuthValidator = [
  loginOrEmailValidator,
  passwordValidator,
  returnErrors,
];
