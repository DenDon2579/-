export interface ICommentInputModel {
  content: string;
  postId: string;
  authorId: string;
}

export interface ICommentViewModel {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: string;
}

export interface ICommentDbModel {
  id: string;
  content: string;
  postId: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: string;
}
