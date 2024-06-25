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
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;
    const posts = await PostRepository.getAll(
      page,
      pageSize,
      sortParams,
      blogId
    );

    return posts;
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    return await PostRepository.findById(id);
  },
  async create(postData: IPostInputModel) {
    const blogName = (await BlogRepository.findById(postData.blogId))?.name;
    return await PostRepository.create({ ...postData, blogName });
  },
  async updateById(id: string, postData: IPostInputModel) {
    return await PostRepository.updateById(id, postData);
  },
  async deleteById(id: string) {
    return await PostRepository.deleteById(id);
  },
};
