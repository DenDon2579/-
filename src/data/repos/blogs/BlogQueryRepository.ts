import { IBlogDbModel, IBlogViewModel } from '../../../types/blogs';
import {
  IPaginator,
  IPaginatorParams,
  ISortParams,
} from '../../../types/common';
import { mongoDB } from '../../db/db';

export default {
  async getAll(
    { pageNumber: page, pageSize, sortParams }: IPaginatorParams,
    searchNameTerm?: string
  ): Promise<IPaginator<IBlogViewModel>> {
    const filter = searchNameTerm
      ? { name: { $regex: searchNameTerm, $options: 'i' } }
      : {};

    const findResult = await mongoDB
      .collection<IBlogDbModel>('blogs')
      .find(filter)
      .sort(sortParams)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .toArray();

    const totalCount = await mongoDB
      .collection<IBlogDbModel>('blogs')
      .countDocuments(filter);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const blogs = findResult.map((blog) => {
      const { _id: _, ...blogWithoutMongoId } = blog;
      return blogWithoutMongoId;
    });

    return { page, pageSize, pagesCount, totalCount, items: blogs };
  },
  async findById(id: string) {
    const findResult = await mongoDB
      .collection<IBlogDbModel>('blogs')
      .findOne({ id });

    if (findResult) {
      const { _id: _, ...result } = findResult;
      return result;
    }
    return null;
  },
};
