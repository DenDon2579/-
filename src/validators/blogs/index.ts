import { body } from 'express-validator';
import returnErrors from '../returnErrors';

const blogNameValidator = body('name')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Invalid length');

const blogDescriptionValidator = body('description')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('Invalid length');

const blogUrlValidator = body('websiteUrl')
  .isString()
  .withMessage('This field is required')
  .isURL()
  .withMessage('Value must be an URL')
  .isLength({ min: 1, max: 100 })
  .withMessage('Invalid length');

export const blogInputValidator = [
  blogNameValidator,
  blogDescriptionValidator,
  blogUrlValidator,
  returnErrors,
];
