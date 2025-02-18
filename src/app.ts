import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { blogsRouter } from './routers/blogs';
import { postsRouter } from './routers/posts';
import { testingRouter } from './routers/testing';
import { usersRouter } from './routers/users';
import authController from './controllers/auth/authController';
import userInfoController from './controllers/auth/userInfoController';
import authMiddleware from './middlewares/authMiddleware';
import { commentsRouter } from './routers/comments';
import bearerAuthMiddleware from './middlewares/bearerAuthMiddleware';
import nodemailer from 'nodemailer';
import EmailService from './services/EmailService';
import { authRouter } from './routers/auth';
import cookieParser from 'cookie-parser';

export const app = Express();

app.use(bodyParser.json()).use(cors());
app.use(cookieParser());

app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/testing', testingRouter);
app.use('/comments', commentsRouter);

app.use('/auth', authRouter);

// app.get('/', async (req, res) => {
//   await EmailService.sendEmail(
//     'vladikmegarogalik@gmail.com',
//     'NEGRI',
//     "<a href='tiktok.com'>VSE SUDA</a>"
//   );
//   res.sendStatus(200);
// });
