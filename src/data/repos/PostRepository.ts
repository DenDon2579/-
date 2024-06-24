import { IPost, IPostInputModel, IPostViewModel } from '../../../types/posts';
import { DB, mongoDB } from '../db/db';
import BlogRepository from './BlogRepository';

export default {
  async getAll() {
    const findResult = await mongoDB
      .collection<IPost>('posts')
      .find({})
      .toArray();

    return findResult.map((post) => {
      const { _id: _, ...postWithoutMongoId } = post;
      return postWithoutMongoId;
    });
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    const findResult = await mongoDB.collection<IPost>('posts').findOne({ id });

    if (findResult) {
      const { _id: _, ...result } = findResult;
      const blogName = (await BlogRepository.findById(result.blogId))?.name;
      if (blogName)
        return {
          ...result,
          blogName,
        };
    }
    return null;
  },
  async create(postData: IPostInputModel) {
    const id = Date.now().toString();
    await mongoDB.collection('posts').insertOne({
      id,
      ...postData,
      createdAt: new Date().toISOString(),
    });
    return this.findById(id);
  },
  async updateById(id: string, postData: IPostInputModel) {
    const updateResult = await mongoDB
      .collection<IPost>('posts')
      .updateOne({ id }, { $set: { ...postData } });
    if (updateResult.modifiedCount) return true;
    return null;
  },
  async deleteById(id: string) {
    const deleteResult = await mongoDB.collection('posts').deleteOne({ id });
    if (deleteResult.deletedCount) {
      return true;
    }
    return null;
  },
};
