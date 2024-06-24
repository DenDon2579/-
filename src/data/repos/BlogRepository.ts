import {
  IBlog,
  IBlogInputModel,
  IBlogRepositoryInputModel,
} from '../../../types/blogs';
import { mongoDB } from '../db/db';

export default {
  async getAll() {
    return (await mongoDB.collection<IBlog>('blogs').find({}).toArray()).map(
      (blog) => {
        const { _id: _, ...blogWithoutMongoId } = blog;
        return blogWithoutMongoId;
      }
    );
  },
  async findById(id: string) {
    const findResult = await mongoDB.collection<IBlog>('blogs').findOne({ id });

    if (findResult) {
      const { _id: _, ...result } = findResult;
      return result;
    }
    return null;
  },
  async create(blogData: IBlogRepositoryInputModel) {
    const id = Date.now().toString();
    await mongoDB.collection<IBlog>('blogs').insertOne({
      ...blogData,
      id,
      createdAt: new Date().toISOString(),
    });
    return this.findById(id);
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    const updateResult = await mongoDB
      .collection<IBlog>('blogs')
      .updateOne({ id }, { $set: { ...blogData } });
    if (updateResult.modifiedCount) {
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
