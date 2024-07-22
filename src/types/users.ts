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
}

export interface IUserRepoModel {
  login: string;
  email: string;
  salt: string;
  hash: string;
}

export interface IUserViewModel {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}
