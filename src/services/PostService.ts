import { ISortParams } from '../../types/common';
import { IPost, IPostInputModel, IPostViewModel } from '../../types/posts';
import { mongoDB } from '../data/db/db';
import BlogRepository from '../data/repos/BlogRepository';
import PostRepository from '../data/repos/PostRepository';

export default {
  async getAll(
    page: number = 1,
    pageSize: number = 10,
    sortParams: ISortParams = { createdAt: 'desc' },
    blogId?: string
  ) {
    const posts = await PostRepository.getAll(
      page,
      pageSize,
      sortParams,
      blogId
    );

    posts.items = await Promise.all(
      posts.items.map(async (post) => ({
        ...post,
        blogName: (await BlogRepository.findById(post.blogId))?.name,
      }))
    );

    return posts;
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    return await PostRepository.findById(id);
  },
  async create(postData: IPostInputModel) {
    return await PostRepository.create(postData);
  },
  async updateById(id: string, postData: IPostInputModel) {
    return await PostRepository.updateById(id, postData);
  },
  async deleteById(id: string) {
    return await PostRepository.deleteById(id);
  },
};
