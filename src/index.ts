import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

// 1
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const port = 3000;

// 2
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
