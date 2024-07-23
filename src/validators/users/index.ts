import { body } from 'express-validator';
import returnErrors from '../returnErrors';

const loginValidator = body('login')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('Invalid length');
// .matches('/^[a-zA-Z0-9_-]*$/')
// .withMessage('Invalid pattern');

const emailValidator = body('email')
  .isString()
  .withMessage('This field is required')
  .isEmail()
  .withMessage('Not email');

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

export const userEmailValidator = [emailValidator, returnErrors];
