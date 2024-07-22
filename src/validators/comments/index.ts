import { body } from 'express-validator';
import returnErrors from '../returnErrors';

const commentContentValidator = body('content')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 20, max: 300 })
  .withMessage('Invalid length');

export const commentInputValidator = [commentContentValidator, returnErrors];
