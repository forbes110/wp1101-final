import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db';
import mongo from './mongo';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo();

server.start({ port: process.env.PORT | 80 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 80}!`);
});