import {
  IBlog,
  IBlogInputModel,
  IBlogRepositoryInputModel,
} from '../../../types/blogs';
import { IPaginator, ISortParams } from '../../../types/common';
import { mongoDB } from '../db/db';

export default {
  async getAll(
    page: number = 1,
    pageSize: number = 10,
    sortParams: ISortParams = { createdAt: 'desc' },
    searchNameTerm?: string
  ): Promise<IPaginator<IBlog>> {
    const filter = searchNameTerm ? { name: { $regex: searchNameTerm } } : {};
    const findResult = await mongoDB
      .collection<IBlog>('blogs')
      .find(filter)
      .sort(sortParams)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .toArray();

    const totalCount = await mongoDB
      .collection<IBlog>('blogs')
      .countDocuments(filter);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const blogs = findResult.map((blog) => {
      const { _id: _, ...blogWithoutMongoId } = blog;
      return blogWithoutMongoId;
    });

    return { page, pageSize, pagesCount, totalCount, items: blogs };
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
