import { MongoClient, ServerApiVersion } from 'mongodb';
import { SETTINGS } from '../../settings';

const mongo = new MongoClient(SETTINGS.MONGO, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function startMongo() {
  try {
    await mongo.connect();

    await mongo.db('admin').command({ ping: 1 });
    console.log('MONGO STARTED');
  } catch (e) {
    throw e;
  }
}

export const mongoDB = mongo.db('main');
