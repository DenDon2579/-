export interface IUserInputModel {
  login: string;
  email: string;
  password: string;
}

export interface IUserDbModel {
  id: string;
  login: string;
  email: string;
  salt: string;
  hash: string;
  createdAt: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: string;
  } | null;
}

export interface IUserRepoModel {
  login: string;
  email: string;
  salt: string;
  hash: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: string;
  } | null;
}

export interface IUserViewModel {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}
