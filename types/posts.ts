export interface IPostInputModel {
  title: string; // maxLength: 30
  shortDescription: string; // maxLength: 100
  content: string; // maxLength: 1000
  blogId: string;
}

export interface IPostViewModel extends IPostInputModel {
  id: string;
  blogName: string;
  createdAt: string;
}

export interface IPost {
  id: string;
  title: string; // maxLength: 30
  shortDescription: string; // maxLength: 100
  content: string; // maxLength: 1000
  blogId: string;
  createdAt: string;
}
