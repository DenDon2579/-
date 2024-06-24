import { IPost, IPostInputModel, IPostViewModel } from '../../types/posts';
import { mongoDB } from '../data/db/db';
import BlogRepository from '../data/repos/BlogRepository';
import PostRepository from '../data/repos/PostRepository';

export default {
  async getAll() {
    const posts = await PostRepository.getAll();

    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        blogName: (await BlogRepository.findById(post.blogId))?.name,
      }))
    );
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
