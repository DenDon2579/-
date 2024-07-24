import { IUserInputModel } from '../types/users';
import { genSalt, hash } from 'bcrypt';
import UserRepository from '../data/repos/users/UserRepository';
import dateFns, { Duration } from 'date-fns';
import EmailService from './EmailService';
import crypto from 'crypto';

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
    return [
      await UserRepository.create({
        salt,
        hash,
        login: userData.login,
        email: userData.email,
        emailConfirmation: null,
      }),
      null,
    ];
  },

  async register(userData: IUserInputModel) {
    if (await UserRepository.findByLoginOrEmail(userData.login)) {
      return [null, { field: 'login', message: 'login should be unique' }];
    }

    if (await UserRepository.findByLoginOrEmail(userData.email)) {
      return [null, { field: 'email', message: 'email should be unique' }];
    }

    const salt = await genSalt(10);
    const hash = await this._createHash(userData.password, salt);

    const emailConfirmationCode = crypto.randomUUID();
    const expirationDate = dateFns
      .add(Date.now(), { minutes: 30 })
      .toISOString();
    const createdUserId = await UserRepository.create({
      salt,
      hash,
      login: userData.login,
      email: userData.email,
      emailConfirmation: {
        confirmationCode: emailConfirmationCode,
        expirationDate,
      },
    });

    if (createdUserId) {
      const isEmailSended = await EmailService.sendEmail(
        userData.email,
        'Подтверждение почты',
        `<a href="https://somesite.com/confirm-email?code=${emailConfirmationCode}">confirm</a>`
      );

      if (isEmailSended) {
        return [createdUserId, null];
      }
    }

    return null;
  },

  async deleteById(id: string) {
    return await UserRepository.deleteById(id);
  },

  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<null | string> {
    const userData = await UserRepository.findByLoginOrEmail(loginOrEmail);
    if (userData) {
      const hash = await this._createHash(password, userData.salt);
      if (hash === userData.hash) {
        return userData.id;
      }
    }
    return null;
  },

  async _createHash(password: string, salt: string) {
    return await hash(password, salt);
  },

  async confirmRegistration(code: string) {
    const userData = await UserRepository.getUserByConfirmationCode(code);
    console.log(userData);
    if (userData) {
      if (
        userData.emailConfirmation?.confirmationCode === code &&
        new Date(userData.emailConfirmation.expirationDate).getTime() -
          Date.now() >=
          0
      ) {
        await UserRepository.confirmEmail(userData.id);
        return true;
      }
    }
    return null;
  },

  async resendConfirmationEmail(email: string) {
    const userData = await UserRepository.findByLoginOrEmail(email);
    if (userData && userData.emailConfirmation) {
      const emailConfirmationCode = crypto.randomUUID();
      const expirationDate = dateFns
        .add(Date.now(), { minutes: 30 })
        .toISOString();

      await UserRepository.setConfirmationCodeByEmail(
        email,
        emailConfirmationCode,
        expirationDate
      );

      const isEmailSended = await EmailService.sendEmail(
        userData.email,
        'Подтверждение почты',
        `<a href="https://somesite.com/confirm-email?code=${emailConfirmationCode}">confirm</a>`
      );

      if (isEmailSended) return true;
    }
    return null;
  },
};
