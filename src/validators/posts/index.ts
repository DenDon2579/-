import { body } from 'express-validator';
import returnErrors from '../returnErrors';
import BlogRepository from '../../data/repos/BlogRepository';

const postTitleValidator = body('title')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage('Invalid length');

const postShortDescriptionValidator = body('shortDescription')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Invalid length');

const postContentValidator = body('content')
  .isString()
  .withMessage('This field is required')
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage('Invalid length');

const postBlogIdValidator = body('blogId')
  .isString()
  .withMessage('This field is required')
  .custom(async (id) => {
    if (!(await BlogRepository.findById(id))) {
      throw Error('Blog not found');
    }
  });

export const postInputValidator = [
  postTitleValidator,
  postShortDescriptionValidator,
  postContentValidator,
  postBlogIdValidator,
  returnErrors,
];

export const postInputValidatorWithoutBlogId = [
  postTitleValidator,
  postShortDescriptionValidator,
  postContentValidator,
  returnErrors,
];
