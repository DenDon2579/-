import { ISortParams, IdType } from '../../types/common';
import {
  IPostDbModel,
  IPostInputModel,
  IPostViewModel,
} from '../../types/posts';
import { mongoDB } from '../data/db/db';
import BlogRepository from '../data/repos/blogs/BlogRepository';
import PostRepository from '../data/repos/posts/PostRepository';

export default {
  async create(postData: IPostInputModel): Promise<IdType | null> {
    const blogName = await BlogRepository.getBlogNameById(postData.blogId);
    return await PostRepository.create({ ...postData, blogName });
  },
  async updateById(id: string, postData: IPostInputModel) {
    return await PostRepository.updateById(id, postData);
  },
  async deleteById(id: string) {
    return await PostRepository.deleteById(id);
  },
  async updateBlogNameInPostsByBlogId(blogId: string, newBlogName: string) {
    PostRepository.updateBlogNameInPostsByBlogId(blogId, newBlogName);
  },
};
