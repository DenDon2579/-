import dotenv from 'dotenv';
dotenv.config();

export const SETTINGS = {
  PORT: process.env.PORT || 3000,
  MONGO: process.env.MONGO || '',
  SECRET: process.env.SECRET || '123',
};

export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};
