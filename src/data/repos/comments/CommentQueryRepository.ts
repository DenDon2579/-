import { IPaginator, IPaginatorParams } from './../../../types/common';
import { ICommentDbModel, ICommentViewModel } from '../../../types/comments';
import { IPostDbModel } from '../../../types/posts';
import { mongoDB } from '../../db/db';

export default {
  async findById(id: string): Promise<ICommentViewModel | null> {
    const result = await mongoDB
      .collection<ICommentDbModel>('comments')
      .findOne({ id });
    if (result) {
      return {
        id: result.id,
        commentatorInfo: result.commentatorInfo,
        createdAt: result.createdAt,
        content: result.content,
      };
    }
    return null;
  },

  async getAllCommentsOfPost(
    { pageNumber: page, pageSize, sortParams }: IPaginatorParams,
    postId: string
  ): Promise<IPaginator<ICommentViewModel> | null> {
    const filter = postId ? { postId } : {};
    const findResult = await mongoDB
      .collection<ICommentDbModel>('comments')
      .find(filter)
      .sort(sortParams)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .toArray();
    console.log(sortParams);
    const totalCount = await mongoDB
      .collection('comments')
      .countDocuments(filter);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const comments = findResult.map((comment) => {
      return {
        id: comment.id,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
        content: comment.content,
      };
    });

    return comments.length
      ? { page, pageSize, pagesCount, totalCount, items: comments }
      : null;
  },
};
