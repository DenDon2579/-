import { ICommentDbModel, ICommentInputModel } from '../../../types/comments';
import { mongoDB } from '../../db/db';
import UserQueryRepository from '../users/UserQueryRepository';

export default {
  async create({ authorId, postId, content }: ICommentInputModel) {
    const authorData = await UserQueryRepository.findById(authorId);

    const id = Date.now().toString();
    try {
      await mongoDB.collection('comments').insertOne({
        id,
        content,
        postId,
        commentatorInfo: {
          userId: authorId,
          userLogin: authorData?.login,
        },
        createdAt: new Date().toISOString(),
      });
      return id;
    } catch (e) {
      return null;
    }
  },

  async updateById(id: string, newContent: string) {
    const updateResult = await mongoDB
      .collection<ICommentDbModel>('comments')
      .updateOne({ id }, { $set: { content: newContent } });
    if (updateResult.modifiedCount) return true;
    return null;
  },

  async deleteById(id: string) {
    const deleteResult = await mongoDB.collection('comments').deleteOne({ id });
    if (deleteResult.deletedCount) {
      return true;
    }
    return null;
  },
};
