import CommentRepository from '../data/repos/comments/CommentRepository';
import { ICommentInputModel } from '../types/comments';

export default {
  async create(commentData: ICommentInputModel) {
    return await CommentRepository.create(commentData);
  },
  async updateById(id: string, newContent: string) {
    return await CommentRepository.updateById(id, newContent);
  },
  async deleteById(id: string) {
    return await CommentRepository.deleteById(id);
  },
};
