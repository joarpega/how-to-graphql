import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql'; // 1

export const schema = makeSchema({
  types, // 2
  outputs: {
    schema: join(__dirname, '..', 'schema.graphql'), // 2
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 3
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
});
