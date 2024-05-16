import { IBlogInputModel } from '../../../types/blogs';
import { DB } from '../db/db';

export default {
  async getAll() {
    return DB.blogs;
  },
  async findById(id: string) {
    const findResult = DB.blogs.find((blog) => blog.id === id);
    if (findResult) {
      return findResult;
    }
    return null;
  },
  async create(blogData: IBlogInputModel) {
    const id = Date.now().toString();
    DB.blogs.push({
      id,
      ...blogData,
      createdAt: new Date().toISOString(),
      isMembership: false,
    });
    return this.findById(id);
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    const findResult = DB.blogs.find((blog) => blog.id === id);
    if (findResult) {
      findResult.description = blogData.description;
      findResult.name = blogData.name;
      findResult.websiteUrl = blogData.websiteUrl;
      return true;
    }
    return null;
  },
  async deleteById(id: string) {
    const findResult = await this.findById(id);
    if (findResult) {
      DB.blogs = DB.blogs.filter((blog) => blog.id !== id);
      return true;
    }
    return null;
  },
};
