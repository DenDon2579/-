import { IBlogInputModel } from '../../../types/blogs';
import { DB } from '../db/db';

export default {
  getAll() {
    return DB.blogs;
  },
  findById(id: string) {
    const findResult = DB.blogs.find((blog) => blog.id === id);
    if (findResult) {
      return findResult;
    }
    return null;
  },
  create(blogData: IBlogInputModel) {
    const id = Date.now().toString();
    DB.blogs.push({ id, ...blogData });
    return this.findById(id);
  },
  updateById(id: string, blogData: IBlogInputModel) {
    const findResult = DB.blogs.find((blog) => blog.id === id);
    if (findResult) {
      findResult.description = blogData.description;
      findResult.name = blogData.name;
      findResult.websiteUrl = blogData.websiteUrl;
      return true;
    }
    return null;
  },
  deleteById(id: string) {
    const findResult = this.findById(id);
    if (findResult) {
      DB.blogs = DB.blogs.filter((blog) => blog.id !== id);
      return true;
    }
    return null;
  },
};
