export interface IPostInputModel {
  title: string; // maxLength: 30
  shortDescription: string; // maxLength: 100
  content: string; // maxLength: 1000
  blogId: string;
}

export interface IPostRepoInputModel {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName?: string;
}

export interface IPostViewModel {
  id: string;
  createdAt: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

export interface IPostDbModel {
  id: string;
  createdAt: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}
