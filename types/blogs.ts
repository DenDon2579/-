export interface IBlogInputModel {
  name: string; // maxLength: 15
  description: string; // maxLength: 500
  websiteUrl: string; // maxLength: 100 & must be url
}

export interface IBlogViewModel extends IBlogInputModel {
  id: string;
  createdAt: string;
  isMembership: boolean;
}

export interface IBlog extends IBlogInputModel {
  id: string;
  createdAt: string;
  isMembership: boolean;
}

export interface IBlogRepositoryInputModel extends IBlogInputModel {
  isMembership: boolean;
}
