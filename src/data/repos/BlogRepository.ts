import { IBlog, IBlogInputModel, IBlogViewModel } from '../../../types/blogs';
import { DB, mongoDB } from '../db/db';

export default {
  async getAll() {
    return mongoDB.collection<IBlog>('blogs').find({}).toArray();
  },
  async findById(id: string) {
    const findResult = await mongoDB.collection<IBlog>('blogs').findOne({ id });

    if (findResult) {
      const { _id: _, ...result } = findResult;
      return result;
    }
    return null;
  },
  async create(blogData: IBlogInputModel) {
    const id = Date.now().toString();
    await mongoDB.collection<IBlog>('blogs').insertOne({
      ...blogData,
      id,
      createdAt: new Date().toISOString(),
      isMembership: false,
    });
    return this.findById(id);
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    const findResult = await this.findById(id);
    if (findResult) {
      findResult.description = blogData.description;
      findResult.name = blogData.name;
      findResult.websiteUrl = blogData.websiteUrl;
      return true;
    }
    return null;
  },
  async deleteById(id: string) {
    const deleteResult = await mongoDB.collection('blogs').deleteOne({ id });
    if (deleteResult.deletedCount) {
      return true;
    }
    return null;
  },
};
