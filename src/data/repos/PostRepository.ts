import { IPostInputModel, IPostViewModel } from '../../../types/posts';
import { DB } from '../db/db';
import BlogRepository from './BlogRepository';

export default {
  async getAll() {
    return DB.posts.map(async (post) => ({
      ...post,
      blogName: (await BlogRepository.findById(post.blogId))?.name,
    }));
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    const findResult = DB.posts.find((post) => post.id === id);
    if (findResult) {
      const blogName = (await BlogRepository.findById(findResult.blogId))?.name;
      if (blogName)
        return {
          ...findResult,
          blogName,
        };
    }
    return null;
  },
  async create(postData: IPostInputModel) {
    const id = Date.now().toString();
    DB.posts.push({
      id,
      ...postData,
      createdAt: new Date().toISOString(),
      isMembership: false,
    });
    return this.findById(id);
  },
  async updateById(id: string, postData: IPostInputModel) {
    const findResult = DB.posts.find((post) => post.id === id);
    if (findResult) {
      findResult.blogId = postData.blogId;
      findResult.title = postData.title;
      findResult.shortDescription = postData.shortDescription;
      findResult.content = postData.content;
      return true;
    }
    return null;
  },
  async deleteById(id: string) {
    const findResult = await this.findById(id);
    if (findResult) {
      DB.posts = DB.posts.filter((post) => post.id !== id);
      return true;
    }
    return null;
  },
};
