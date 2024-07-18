import { IUserInputModel } from '../../types/users';
import { genSalt, hash } from 'bcrypt';
import UserRepository from '../data/repos/users/UserRepository';

export default {
  async create(userData: IUserInputModel) {
    if (await UserRepository.findByLoginOrEmail(userData.login)) {
      return [null, { field: 'login', message: 'login should be unique' }];
    }

    if (await UserRepository.findByLoginOrEmail(userData.email)) {
      return [null, { field: 'email', message: 'email should be unique' }];
    }

    const salt = await genSalt(10);
    const hash = await this._createHash(userData.password, salt);
    return [await UserRepository.create({ ...userData, salt, hash }), null];
  },

  async deleteById(id: string) {
    return await UserRepository.deleteById(id);
  },

  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const userData = await UserRepository.findByLoginOrEmail(loginOrEmail);
    if (userData) {
      const hash = await this._createHash(password, userData.salt);
      if (hash === userData.hash) {
        return true;
      }
    }
    return false;
  },

  async _createHash(password: string, salt: string) {
    return await hash(password, salt);
  },
};
