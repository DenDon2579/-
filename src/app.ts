import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { blogsRouter } from './routers/blogs';
import { postsRouter } from './routers/posts';
import { testingRouter } from './routers/testing';
import { usersRouter } from './routers/users';
import authController from './controllers/users/authController';

export const app = Express();

app.use(bodyParser.json()).use(cors());

app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/testing', testingRouter);

app.post('/auth/login', authController);
