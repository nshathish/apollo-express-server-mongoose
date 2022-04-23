import { connect } from 'mongoose';

export default async function connectDb(): Promise<void> {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    throw new Error('mongodb connection string missing');
  }
  try {
    await connect(MONGO_URL);
  } catch (err) {
    console.error('mongo db connection error', err);
    process.exit(1);
  }
}
