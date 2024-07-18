import {
  IBlogDbModel,
  IBlogInputModel,
  IBlogRepoInputModel,
  IBlogViewModel,
} from '../../../../types/blogs';
import { IPaginator, ISortParams, IdType } from '../../../../types/common';
import { mongoDB } from '../../db/db';

export default {
  async create(blogData: IBlogRepoInputModel): Promise<IdType | null> {
    const id = Date.now().toString();
    try {
      await mongoDB.collection<IBlogDbModel>('blogs').insertOne({
        ...blogData,
        id,
        createdAt: new Date().toISOString(),
      });
      return id;
    } catch (e) {
      return null;
    }
  },
  async updateById(id: string, blogData: IBlogInputModel) {
    const updateResult = await mongoDB
      .collection<IBlogDbModel>('blogs')
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
  async getBlogNameById(id: string) {
    const blog = await mongoDB.collection('blogs').findOne({ id });
    if (blog?.name) {
      return blog.name;
    }
    return null;
  },
};
