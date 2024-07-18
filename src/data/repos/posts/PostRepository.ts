import { ISortParams, IdType } from '../../../../types/common';
import {
  IPostDbModel,
  IPostInputModel,
  IPostRepoInputModel,
  IPostViewModel,
} from '../../../../types/posts';
import { mongoDB } from '../../db/db';
import BlogRepository from '../blogs/BlogRepository';

export default {
  async create(postData: IPostRepoInputModel): Promise<IdType | null> {
    const id = Date.now().toString();
    try {
      await mongoDB.collection('posts').insertOne({
        id,
        ...postData,
        createdAt: new Date().toISOString(),
      });
      return id;
    } catch (e) {
      return null;
    }
  },
  async updateById(id: string, postData: IPostInputModel) {
    const updateResult = await mongoDB
      .collection<IPostDbModel>('posts')
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

  async updateBlogNameInPostsByBlogId(blogId: string, newBlogName: string) {
    await mongoDB
      .collection<IPostDbModel>('posts')
      .updateMany({ blogId }, { $set: { blogName: newBlogName } });
  },
};
