import { IBlogInputModel, IBlogViewModel } from '../../types/blogs';
import { IPaginator, ISortParams, IdType } from '../../types/common';
import { mongoDB } from '../data/db/db';
import BlogRepository from '../data/repos/blogs/BlogRepository';
import PostService from './PostService';

export default {
  async create(blogData: IBlogInputModel): Promise<IdType | null> {
    return await BlogRepository.create({ ...blogData, isMembership: false });
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    const isUpdated = await BlogRepository.updateById(id, blogData);
    if (isUpdated) {
      await PostService.updateBlogNameInPostsByBlogId(id, blogData.name);
      return true;
    }
    return false;
  },
  async deleteById(id: string) {
    return await BlogRepository.deleteById(id);
  },
};
