import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { PluginDefinition } from 'apollo-server-core';
import { context } from './context';
import { schema } from './schema';

const isProd = process.env.SERVER_PROD;
const port = process.env.SERVER_PORT;

let plugins: PluginDefinition[] = [];

if(isProd==='false') {
  plugins = [ApolloServerPluginLandingPageGraphQLPlayground()];
}

export const server = new ApolloServer({
  schema,
  context,
  plugins,
});

// 2
server.listen({ port }).then(({ url }) => {
  console.log('Config ==> ', isProd, plugins);
  console.log(`🚀 Server ready at ${url}`);
});
