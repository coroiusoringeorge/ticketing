import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

jest.setTimeout(30000);

beforeAll(async () => {
  process.env.JWT_KEY = 'test-key';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    // mongodb driver 7.6 fails to dynamic-import `os` under Jest and then
    // sends an empty client metadata document. Provide the adapter directly.
    runtimeAdapters: { os: require('os') },
  });
}, 90000);

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
 
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

