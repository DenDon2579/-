import { IUserDbModel, IUserRepoModel } from '../../../types/users';
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
  async findById(id: string) {
    return await mongoDB.collection<IUserDbModel>('users').findOne({ id });
  },

  async setRefreshToken(userId: string, refreshToken: string | null) {
    return await mongoDB
      .collection<IUserDbModel>('users')
      .updateOne({ id: userId }, { $set: { refreshToken } });
  },

  async getUserByConfirmationCode(code: string) {
    return await mongoDB
      .collection<IUserDbModel>('users')
      .findOne({ 'emailConfirmation.confirmationCode': code });
  },
  async confirmEmail(id: string) {
    await mongoDB
      .collection<IUserDbModel>('users')
      .updateOne({ id }, { $set: { emailConfirmation: null } });
  },
  async setConfirmationCodeByEmail(
    email: string,
    code: string,
    expiresIn: string
  ) {
    await mongoDB.collection<IUserDbModel>('users').updateOne(
      { email },
      {
        $set: {
          emailConfirmation: {
            confirmationCode: code,
            expirationDate: expiresIn,
          },
        },
      }
    );
  },
};
