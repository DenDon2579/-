import {
  IUserDbModel,
  IUserRepoModel,
  IUserViewModel,
} from '../../../types/users';
import { IPaginator, ISortParams } from '../../../types/common';
import { mongoDB } from '../../db/db';

export default {
  async create(userData: IUserRepoModel) {
    const id = Date.now().toString();
    try {
      await mongoDB.collection<IUserDbModel>('users').insertOne({
        ...userData,
        id,
        createdAt: new Date().toISOString(),
      });
      return id;
    } catch (e) {
      return null;
    }
  },
  async deleteById(id: string) {
    const deleteResult = await mongoDB.collection('users').deleteOne({ id });
    if (deleteResult.deletedCount) {
      return true;
    }
    return null;
  },
  async findByLoginOrEmail(loginOrEmail: string) {
    return await mongoDB
      .collection<IUserDbModel>('users')
      .findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
  },
};
