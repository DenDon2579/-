import {
  IPaginator,
  IPaginatorParams,
  ISortParams,
} from '../../../types/common';
import { IUserDbModel, IUserViewModel } from '../../../types/users';
import { mongoDB } from '../../db/db';

export default {
  async getAll(
    { pageNumber: page, pageSize, sortParams }: IPaginatorParams,
    searchEmailTerm?: string | undefined,
    searchLoginTerm?: string | undefined
  ): Promise<IPaginator<IUserViewModel>> {
    const filter: any = {};
    filter.$or = [];

    if (searchEmailTerm) {
      filter.$or.push({ $regex: searchEmailTerm, $options: 'i' });
    }

    if (searchLoginTerm) {
      filter.$or.push({ $regex: searchLoginTerm, $options: 'i' });
    }

    const findResult = await mongoDB
      .collection<IUserDbModel>('users')
      .find(filter)
      .sort(sortParams)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .toArray();

    const totalCount = await mongoDB
      .collection<IUserDbModel>('users')
      .countDocuments(filter);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const users = findResult.map((user) => {
      return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
      };
    });

    return { page, pageSize, pagesCount, totalCount, items: users };
  },
  async findById(id: string): Promise<IUserViewModel | null> {
    const user = await mongoDB
      .collection<IUserDbModel>('users')
      .findOne({ id });

    if (user) {
      return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
      };
    }
    return null;
  },
};
