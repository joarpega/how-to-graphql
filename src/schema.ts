import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql'; // 1

import * as dotenv from 'dotenv';

dotenv.config();

const isContainer = process.env.APP_COMPILE_CONTAINER === 'true';

let nexusPath = '';
let contextPath = '';

if (isContainer) {
  nexusPath = join(__dirname, '..', 'nexus-typegen.js')
  contextPath = join(__dirname, './context.js')
} else {
  nexusPath = join(__dirname, '..', 'nexus-typegen.ts');
  contextPath = join(__dirname, './context.ts');
}

export const schema = makeSchema({
  types,
  outputs: {
    typegen: nexusPath,
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: contextPath,
    export: 'Context',
  },
});
