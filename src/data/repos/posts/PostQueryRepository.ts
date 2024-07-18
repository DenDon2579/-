import { ISortParams } from '../../../../types/common';
import { IPostDbModel, IPostViewModel } from '../../../../types/posts';
import { mongoDB } from '../../db/db';

export default {
  async getAll(
    page: number = 1,
    pageSize: number = 10,
    sortParams: ISortParams = { createdAt: 'desc' },
    blogId?: string
  ) {
    console.log(blogId);
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;
    const filter = blogId ? { blogId } : {};
    const findResult = await mongoDB
      .collection<IPostDbModel>('posts')
      .find(filter)
      .sort(sortParams)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .toArray();
    console.log(sortParams);
    const totalCount = await mongoDB.collection('posts').countDocuments(filter);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const posts = findResult.map((post) => {
      const { _id: _, ...postWithoutMongoId } = post;
      return postWithoutMongoId;
    });

    return { page, pageSize, pagesCount, totalCount, items: posts };
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    const findResult = await mongoDB
      .collection<IPostDbModel>('posts')
      .findOne({ id });

    if (findResult) {
      const { _id: _, ...result } = findResult;
      return result;
    }
    return null;
  },
};
