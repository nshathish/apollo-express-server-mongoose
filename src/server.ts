import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schemas/type-defs';
import resolvers from './schemas/resolvers';
import connectDb from './db';

export default async function startApolloServer(): Promise<void> {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await connectDb();
  console.log('connected to mongodb');

  await new Promise<void>(() => app.listen(4000, () => {
    console.log('apollo server started at :4000');
  }));
}
