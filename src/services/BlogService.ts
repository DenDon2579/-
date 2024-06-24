import { IBlog, IBlogInputModel } from '../../types/blogs';
import { mongoDB } from '../data/db/db';
import BlogRepository from '../data/repos/BlogRepository';

export default {
  async getAll(): Promise<IBlog[]> {
    return await BlogRepository.getAll();
  },
  async findById(id: string): Promise<IBlog | null> {
    return await BlogRepository.findById(id);
  },
  async create(blogData: IBlogInputModel) {
    return await BlogRepository.create({ ...blogData, isMembership: false });
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    return await BlogRepository.updateById(id, blogData);
  },
  async deleteById(id: string) {
    return await BlogRepository.deleteById(id);
  },
};
