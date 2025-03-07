import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

export const schema = makeSchema({
  types: [types],
  outputs: {
    typegen: join(
      process.cwd(),
      'node_modules/@types/nexus-typegen/index.d.ts'
    ),
    schema: join(process.cwd(), 'schema.graphql'),
  },
  contextType: {
    module: join(process.cwd(), 'apps/backend/src/context.ts'),
    export: 'Context',
  },
});
