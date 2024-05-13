import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { blogsRouter } from './routers/blogs';
import { postsRouter } from './routers/posts';
import { testingRouter } from './routers/testing';

export const app = Express();

app.use(bodyParser.json()).use(cors());

app.use('/blog', blogsRouter);
app.use('/post', postsRouter);
app.use('/testing', testingRouter);
