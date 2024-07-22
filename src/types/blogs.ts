export interface IBlogInputModel {
  name: string; // maxLength: 15
  description: string; // maxLength: 500
  websiteUrl: string; // maxLength: 100 & must be url
}

export interface IBlogRepoInputModel {
  name: string;
  description: string;
  websiteUrl: string;
  isMembership: boolean;
}

export interface IBlogViewModel {
  id: string;
  createdAt: string;
  isMembership: boolean;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface IBlogDbModel {
  id: string;
  createdAt: string;
  isMembership: boolean;
  name: string;
  description: string;
  websiteUrl: string;
}
