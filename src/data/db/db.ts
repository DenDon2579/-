import { IBlog } from './../../../types/blogs';
import { IPost } from './../../../types/posts';

interface IDB {
  posts: IPost[];
  blogs: IBlog[];
}

export const DB: IDB = {
  posts: [],
  blogs: [],
};
