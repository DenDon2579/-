import { IPaginator, ISortParams } from '../../../../types/common';
import { IUserDbModel, IUserViewModel } from '../../../../types/users';
import { mongoDB } from '../../db/db';

export default {
  async getAll(
    page: number = 1,
    pageSize: number = 10,
    sortParams: ISortParams = { createdAt: 'desc' },
    searchEmailTerm?: string | undefined,
    searchLoginTerm?: string | undefined
  ): Promise<IPaginator<IUserViewModel>> {
    const filter: any = {};
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;
    if (searchEmailTerm && searchLoginTerm) {
      filter.$or = [
        { email: { $regex: searchEmailTerm, $options: 'i' } },
        { login: { $regex: searchLoginTerm, $options: 'i' } },
      ];
    } else {
      if (searchEmailTerm) {
        filter.email = { $regex: searchEmailTerm, $options: 'i' };
      }

      if (searchLoginTerm) {
        filter.login = { $regex: searchLoginTerm, $options: 'i' };
      }
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
