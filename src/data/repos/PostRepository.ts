import { IPost, IPostInputModel, IPostViewModel } from '../../../types/posts';
import { DB, mongoDB } from '../db/db';
import BlogRepository from './BlogRepository';

export default {
  async getAll() {
    return await Promise.all(
      (
        await mongoDB.collection<IPost>('posts').find({}).toArray()
      ).map(async (post) => ({
        ...post,
        blogName: (await BlogRepository.findById(post.blogId))?.name,
      }))
    );
    //  const posts = await DB.collection('posts').find({}).toArray();
  },
  async findById(id: string): Promise<IPostViewModel | null> {
    const findResult = await mongoDB.collection<IPost>('posts').findOne({ id });

    if (findResult) {
      const blogName = (await BlogRepository.findById(findResult.blogId))?.name;
      if (blogName)
        return {
          ...findResult,
          blogName,
        };
    }
    return null;
  },
  async create(postData: IPostInputModel) {
    const id = Date.now().toString();
    mongoDB.collection('posts').insertOne({
      id,
      ...postData,
      createdAt: new Date().toISOString(),
    });
    return this.findById(id);
  },
  async updateById(id: string, postData: IPostInputModel) {
    const findResult = await this.findById(id);
    if (findResult) {
      findResult.blogId = postData.blogId;
      findResult.title = postData.title;
      findResult.shortDescription = postData.shortDescription;
      findResult.content = postData.content;
      return true;
    }
    return null;
  },
  async deleteById(id: string) {
    const deleteResult = await mongoDB.collection('posts').deleteOne({ id });
    if (deleteResult.deletedCount) {
      return true;
    }
    return null;
  },
};
